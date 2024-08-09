import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { auth, db } from '../auth/firebase'; // Import auth and db from your Firebase config
import { onAuthStateChanged } from 'firebase/auth'; // Import the auth state change listener
import '../styles/GroupManager.css';

const GroupManager = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupCategory, setGroupCategory] = useState('');
  const [groupPrivacy, setGroupPrivacy] = useState('public');
  const [groupUsers, setGroupUsers] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const q = searchTerm
        ? query(collection(db, "groups"), where("name", "==", searchTerm))
        : collection(db, "groups");

      const querySnapshot = await getDocs(q);
      setGroups(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchGroups();
  }, [searchTerm]);

  const handleAddUser = () => {
    if (userEmail.trim() === currentUserEmail) {
      setError("You cannot add yourself to the group.");
      return;
    }
    if (userEmail.trim() && !groupUsers.includes(userEmail.trim())) {
      setGroupUsers([...groupUsers, userEmail.trim()]);
      setUserEmail(''); // Clear the input after adding
      setError(''); // Clear error if any
    } else {
      setError("User is either empty or already in the group.");
    }
  };

  const handleAddGroup = async () => {
    if (groupName.trim()) {
      await addDoc(collection(db, "groups"), {
        name: groupName,
        description: groupDescription,
        category: groupCategory,
        privacy: groupPrivacy,
        users: groupUsers, // Include the list of users
      });
      setGroupName('');
      setGroupDescription('');
      setGroupCategory('');
      setGroupPrivacy('public');
      setGroupUsers([]);
      setSearchTerm('');
      setShowAddGroup(false);
      setShowSearch(true);
    }
  };

  const toggleAddGroup = () => {
    setShowAddGroup(true);
    setShowSearch(false);
    setGroups([]);
    setSelectedGroup(null); // Clear the selected group when adding a new one
  };

  const toggleSearch = () => {
    setShowSearch(true);
    setShowAddGroup(false);
    setSelectedGroup(null); // Clear the selected group when searching
  };

  const handleGroupClick = async (groupId) => {
    const groupRef = doc(db, "groups", groupId);
    const groupDoc = await getDoc(groupRef);

    if (groupDoc.exists()) {
      setSelectedGroup({
        id: groupId,
        ...groupDoc.data(),
        users: groupDoc.data().users || [],
      });
    } else {
      console.error("Group not found!");
    }
  };

  return (
    <div className="group-manager">
      <h1>Connect to People</h1>
      <div className="button-container">
        <button onClick={toggleSearch} className="top-button">
          Search Groups
        </button>
        <button onClick={toggleAddGroup} className="top-button">
          Add Group
        </button>
      </div>

      {showSearch && !selectedGroup && (
        <>
          <input
            type="text"
            placeholder="Search groups"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="group-input"
            style={{ marginTop: '10px' }}
          />
          <div className="group-list">
            {groups.map((group) => (
              <div 
                key={group.id} 
                className="group-card" 
                onClick={() => handleGroupClick(group.id)}>
                <h3>{group.name}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedGroup && (
        <div className="group-details">
          <h2>{selectedGroup.name}</h2>
          <p>{selectedGroup.description}</p>
          <p><strong>Category:</strong> {selectedGroup.category}</p>
          <p><strong>Privacy:</strong> {selectedGroup.privacy}</p>
          <h4>Members</h4>
          <ul className="user-list">
            {selectedGroup.users && selectedGroup.users.length > 0 ? (
              selectedGroup.users.map((user, index) => (
                <li key={index} className="user-item">
                  {user}
                </li>
              ))
            ) : (
              <li>No members</li>
            )}
          </ul>
          <button onClick={toggleSearch} className="group-button">
            Back to Search
          </button>
        </div>
      )}

      {showAddGroup && (
        <>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="group-input"
            style={{ marginTop: '10px' }}
          />
          <textarea
            placeholder="Enter group description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="group-textarea"
            rows="4"
          />
          <input
            type="text"
            placeholder="Enter group category"
            value={groupCategory}
            onChange={(e) => setGroupCategory(e.target.value)}
            className="group-input"
          />
          <select
            value={groupPrivacy}
            onChange={(e) => setGroupPrivacy(e.target.value)}
            className="group-select"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <div className="user-section">
            <h4>Group Members</h4>
            <input
              type="email"
              placeholder="Enter user email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="group-input"
            />
            <button onClick={handleAddUser} className="user-button">
              Add User
            </button>
            {error && <p className="error-message">{error}</p>}
            <ul className="user-list">
              {groupUsers.map((user, index) => (
                <li key={index} className="user-item">
                  {user}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={handleAddGroup} className="group-button">
            Add Group
          </button>
        </>
      )}
    </div>
  );
};

export default GroupManager;

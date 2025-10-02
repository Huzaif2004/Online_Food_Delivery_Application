import React, { useState } from 'react';
import axios from 'axios';
import './delete.css'; // Importing a CSS file for styling

function DeleteMenu() {
    const [menuName, setMenuName] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/api/menu/name', {
                params: { menuName: menuName }
            });
            const menuId = response.data;

            if (menuId) {
                await axios.delete(`http://localhost:8080/api/menuitems/${menuId}`);
                alert(`Menu item '${menuName}' deleted successfully.`);
            } else {
                alert(`Menu item '${menuName}' not found.`);
            }
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert('Error deleting menu item.');
        }
    };

    return (
        <div className="delete-menu-container">
            <h2>Delete Menu Item</h2>
            <form onSubmit={handleDelete} className="delete-menu-form">
                <input
                    type="text"
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                    placeholder="Enter menu name"
                    className="delete-menu-input"
                />
                <button type="submit" className="delete-menu-button">Delete Menu</button>
            </form>
        </div>
    );
}

export default DeleteMenu;

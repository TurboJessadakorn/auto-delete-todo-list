import React, { useState, useEffect } from 'react';

// Define a type for items
type ItemType = 'Fruit' | 'Vegetable';

interface Item {
    type: ItemType;
    name: string;
}

const initialItems: Item[] = [
    { type: 'Fruit', name: 'Apple' },
    { type: 'Vegetable', name: 'Broccoli' },
    { type: 'Vegetable', name: 'Mushroom' },
    { type: 'Fruit', name: 'Banana' },
    { type: 'Vegetable', name: 'Tomato' },
    { type: 'Fruit', name: 'Orange' },
    { type: 'Fruit', name: 'Mango' },
    { type: 'Fruit', name: 'Pineapple' },
    { type: 'Vegetable', name: 'Cucumber' },
    { type: 'Fruit', name: 'Watermelon' },
    { type: 'Vegetable', name: 'Carrot' },
];

const TodoList: React.FC = () => {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [fruits, setFruits] = useState<Item[]>([]);
    const [vegetables, setVegetables] = useState<Item[]>([]);

    const handleItemClick = (item: Item) => {
        setItems(items.filter(i => i !== item));
        if (item.type === 'Fruit') {
            setFruits([...fruits, item]);
        } else {
            setVegetables([...vegetables, item]);
        }

        // After 5 seconds, check if the item is still in its category list before moving it back
        setTimeout(() => {
            if (item.type === 'Fruit') {
                setFruits(fruits => {
                    // If the item is still in the fruits list, move it back to the items list
                    if (fruits.includes(item)) {
                        setItems(items => [...items, item]);
                        return fruits.filter(i => i !== item);
                    }
                    return fruits;
                });
            } else {
                setVegetables(vegetables => {
                    // If the item is still in the vegetables list, move it back to the items list
                    if (vegetables.includes(item)) {
                        setItems(items => [...items, item]);
                        return vegetables.filter(i => i !== item);
                    }
                    return vegetables;
                });
            }
        }, 5000);
    };

    const handleColumnClick = (item: Item) => {
        if (item.type === 'Fruit') {
            setFruits(fruits.filter(i => i !== item));
        } else {
            setVegetables(vegetables.filter(i => i !== item));
        }
        setItems([...items, item]);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>

            {/* Items column */}
            <div className='itemColumn'>
                {items.map((item, index) => (
                    <button className='customBtn' key={index} onClick={() => handleItemClick(item)}>
                        {item.name}
                    </button>
                ))}
            </div>
            
            {/* Fruits column */}
            <div className='customColumn'>
                <div className='headerContainer'>
                    Fruit
                </div>
                <div className='selectedContainer'>
                    {fruits.map((item, index) => (
                        <button className='customBtn' key={index} onClick={() => handleColumnClick(item)}>
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vegetables column */}
            <div className='customColumn'>
                <div className='headerContainer'>
                    Vegetable
                </div>
                <div className='selectedContainer'>
                    {vegetables.map((item, index) => (
                        <button className='customBtn' key={index} onClick={() => handleColumnClick(item)}>
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoList;

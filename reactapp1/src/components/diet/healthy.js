import React, { useState, useEffect, useContext } from 'react';
// Import CSS for styling
import { CityContext } from '../context/CityContext';
import { useNavigate } from 'react-router-dom';

const DietPlansComponent = () => {
    const {dietPlans, setDietPlans} = useContext(CityContext)
    const {selectedDietPlan, setSelectedDietPlan} = useContext(CityContext);
    const navigate=useNavigate()
    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/diet/getall');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setDietPlans(data);
                } else {
                    throw new Error('Response is not an array');
                }
            } catch (error) {
                console.error('Error fetching diet plans:', error);
            }
        };

        fetchDietPlans();
    }, []);

    const handleDietPlanClick = (dietPlan) => {
        setSelectedDietPlan(dietPlan);
        if(selectedDietPlan!=null){
        navigate('/seldiet')}
       
    };
    
    return (
        <div className="diet-plans-container">
            <h3>Diet Plans</h3>
            <div className='diet-plans-grid'>
                {dietPlans.map(dietPlan => (
                    <div 
                        className='diet-plan-item' 
                        key={dietPlan.id}
                        onClick={() => handleDietPlanClick(dietPlan)}
                    >
                        <img 
                            src={dietPlan.dietUrl} 
                            alt={dietPlan.name} 
                        />
                        <div className="diet-plan-info">
                            <h2>{dietPlan.name}</h2>
                            <p>{dietPlan.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default DietPlansComponent;

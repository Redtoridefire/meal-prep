'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Camera, Plus, X, Edit2, Trash2, Save, Search, Filter, ChevronDown, Calendar, ShoppingCart, Target, TrendingUp, Dumbbell, Activity, Moon, Sun, Menu, Download, Printer, Copy, Check } from 'lucide-react';

// Import Google Fonts: Rajdhani (display) and DM Sans (body)
const GOOGLE_FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
`;

// ============ PRE-POPULATED DATA ============
const INITIAL_INGREDIENTS = [
  { id: '1', name: 'Chicken Breast', category: 'protein', protein: 31, carbs: 0, fat: 3.6, calories: 165 },
  { id: '2', name: 'Lean Ground Turkey', category: 'protein', protein: 27, carbs: 0, fat: 8, calories: 195 },
  { id: '3', name: 'Lean Ground Beef', category: 'protein', protein: 26, carbs: 0, fat: 10, calories: 210 },
  { id: '4', name: 'Turkey Sausage', category: 'protein', protein: 14, carbs: 2, fat: 7, calories: 130 },
  { id: '5', name: 'Turkey Bacon', category: 'protein', protein: 20, carbs: 1, fat: 10, calories: 180 },
  { id: '6', name: 'Tuna in Water', category: 'protein', protein: 26, carbs: 0, fat: 1, calories: 116 },
  { id: '7', name: 'Whole Eggs', category: 'protein', protein: 13, carbs: 1.1, fat: 11, calories: 155 },
  { id: '8', name: 'Egg Whites', category: 'protein', protein: 11, carbs: 0.7, fat: 0.2, calories: 52 },
  { id: '9', name: 'Flank Steak', category: 'protein', protein: 26, carbs: 0, fat: 8, calories: 192 },
  { id: '10', name: 'Cottage Cheese (Low-Fat)', category: 'dairy', protein: 12, carbs: 4.5, fat: 2, calories: 86 },
  { id: '11', name: 'Greek Yogurt (Non-Fat)', category: 'dairy', protein: 10, carbs: 6, fat: 0.4, calories: 59 },
  { id: '12', name: 'Mozzarella (Low-Fat)', category: 'dairy', protein: 24, carbs: 3, fat: 16, calories: 254 },
  { id: '13', name: 'Cheddar (Low-Fat)', category: 'dairy', protein: 25, carbs: 2, fat: 14, calories: 240 },
  { id: '14', name: 'Mexican Cheese (Low-Fat)', category: 'dairy', protein: 23, carbs: 2, fat: 15, calories: 250 },
  { id: '15', name: 'Ricotta (Low-Fat)', category: 'dairy', protein: 14, carbs: 6, fat: 5, calories: 138 },
  { id: '16', name: 'Provolone (Low-Fat)', category: 'dairy', protein: 25, carbs: 2, fat: 15, calories: 248 },
  { id: '17', name: 'Feta (Low-Fat)', category: 'dairy', protein: 14, carbs: 4, fat: 16, calories: 264 },
  { id: '18', name: 'Spinach', category: 'vegetable', protein: 2.9, carbs: 3.6, fat: 0.4, calories: 23 },
  { id: '19', name: 'Lettuce', category: 'vegetable', protein: 1.4, carbs: 2.9, fat: 0.2, calories: 15 },
  { id: '20', name: 'Zucchini', category: 'vegetable', protein: 1.2, carbs: 3.1, fat: 0.3, calories: 17 },
  { id: '21', name: 'Bell Peppers', category: 'vegetable', protein: 1, carbs: 6, fat: 0.3, calories: 31 },
  { id: '22', name: 'Onions', category: 'vegetable', protein: 1.1, carbs: 9.3, fat: 0.1, calories: 40 },
  { id: '23', name: 'Cucumbers', category: 'vegetable', protein: 0.7, carbs: 3.6, fat: 0.1, calories: 16 },
  { id: '24', name: 'Cherry Tomatoes', category: 'vegetable', protein: 0.9, carbs: 3.9, fat: 0.2, calories: 18 },
  { id: '25', name: 'Cauliflower Rice', category: 'vegetable', protein: 1.9, carbs: 5, fat: 0.3, calories: 25 },
  { id: '26', name: 'Berries (Mixed)', category: 'fruit', protein: 0.7, carbs: 12, fat: 0.5, calories: 57 },
  { id: '27', name: 'Low-Carb Wrap', category: 'low-carb', protein: 5, carbs: 11, fat: 4, calories: 100 },
  { id: '28', name: 'Oat Flour', category: 'grain', protein: 13, carbs: 66, fat: 7, calories: 404 },
  { id: '29', name: 'Rolled Oats', category: 'grain', protein: 13, carbs: 67, fat: 7, calories: 389 },
  { id: '30', name: 'Almonds', category: 'fat', protein: 21, carbs: 22, fat: 50, calories: 579 },
  { id: '31', name: 'PB2', category: 'fat', protein: 33, carbs: 25, fat: 13, calories: 325 },
  { id: '32', name: 'Olive Oil', category: 'fat', protein: 0, carbs: 0, fat: 100, calories: 884 },
  { id: '33', name: 'Almond Milk', category: 'dairy', protein: 0.4, carbs: 0.3, fat: 1.1, calories: 13 },
  { id: '34', name: 'Sugar-Free Marinara', category: 'snack', protein: 2, carbs: 8, fat: 0, calories: 40 },
  { id: '35', name: 'Sugar-Free Ketchup', category: 'snack', protein: 0, carbs: 1, fat: 0, calories: 5 },
  { id: '36', name: 'Salsa', category: 'snack', protein: 1, carbs: 4, fat: 0, calories: 20 },
  { id: '37', name: 'Buffalo Sauce', category: 'snack', protein: 0, carbs: 2, fat: 0, calories: 10 },
  { id: '38', name: 'Taco Seasoning', category: 'snack', protein: 0, carbs: 2, fat: 0, calories: 8 },
];

const INITIAL_MEALS = [
  { id: 'm1', name: 'Chicken Taco Tray', category: 'dinner', ingredients: [{ id: 'mi1', ingredientId: '1', grams: 200 }, { id: 'mi2', ingredientId: '14', grams: 50 }, { id: 'mi3', ingredientId: '11', grams: 100 }, { id: 'mi4', ingredientId: '19', grams: 50 }, { id: 'mi5', ingredientId: '36', grams: 50 }], macros: { protein: 76, carbs: 14, fat: 16, calories: 494 } },
  { id: 'm2', name: 'Greek Chicken Tray', category: 'dinner', ingredients: [{ id: 'mi6', ingredientId: '1', grams: 200 }, { id: 'mi7', ingredientId: '11', grams: 100 }, { id: 'mi8', ingredientId: '23', grams: 100 }, { id: 'mi9', ingredientId: '24', grams: 100 }, { id: 'mi10', ingredientId: '17', grams: 30 }], macros: { protein: 80, carbs: 12, fat: 20, calories: 530 } },
  { id: 'm3', name: 'Cheeseburger Casserole', category: 'dinner', ingredients: [{ id: 'mi11', ingredientId: '2', grams: 200 }, { id: 'mi12', ingredientId: '22', grams: 50 }, { id: 'mi13', ingredientId: '13', grams: 50 }, { id: 'mi14', ingredientId: '25', grams: 150 }, { id: 'mi15', ingredientId: '10', grams: 100 }], macros: { protein: 84, carbs: 10, fat: 24, calories: 582 } },
  { id: 'm4', name: 'Pesto Chicken Tray', category: 'dinner', ingredients: [{ id: 'mi16', ingredientId: '1', grams: 200 }, { id: 'mi17', ingredientId: '10', grams: 50 }, { id: 'mi18', ingredientId: '24', grams: 100 }, { id: 'mi19', ingredientId: '12', grams: 50 }], macros: { protein: 72, carbs: 10, fat: 18, calories: 490 } },
  { id: 'm5', name: 'Zucchini Lasagna', category: 'dinner', ingredients: [{ id: 'mi20', ingredientId: '2', grams: 200 }, { id: 'mi21', ingredientId: '20', grams: 300 }, { id: 'mi22', ingredientId: '15', grams: 100 }, { id: 'mi23', ingredientId: '12', grams: 50 }, { id: 'mi24', ingredientId: '34', grams: 100 }], macros: { protein: 80, carbs: 16, fat: 20, calories: 564 } },
  { id: 'm6', name: 'Philly Cheesesteak Bake', category: 'dinner', ingredients: [{ id: 'mi25', ingredientId: '9', grams: 200 }, { id: 'mi26', ingredientId: '21', grams: 100 }, { id: 'mi27', ingredientId: '22', grams: 50 }, { id: 'mi28', ingredientId: '16', grams: 50 }, { id: 'mi29', ingredientId: '10', grams: 50 }], macros: { protein: 80, carbs: 12, fat: 22, calories: 554 } },
  { id: 'm7', name: 'Egg Protein Bake', category: 'breakfast', ingredients: [{ id: 'mi30', ingredientId: '7', grams: 200 }, { id: 'mi31', ingredientId: '8', grams: 200 }, { id: 'mi32', ingredientId: '21', grams: 50 }, { id: 'mi33', ingredientId: '18', grams: 50 }, { id: 'mi34', ingredientId: '13', grams: 30 }], macros: { protein: 60, carbs: 8, fat: 14, calories: 406 } },
  { id: 'm8', name: 'Buffalo Chicken Bake', category: 'dinner', ingredients: [{ id: 'mi35', ingredientId: '1', grams: 200 }, { id: 'mi36', ingredientId: '37', grams: 50 }, { id: 'mi37', ingredientId: '10', grams: 100 }, { id: 'mi38', ingredientId: '11', grams: 50 }, { id: 'mi39', ingredientId: '12', grams: 30 }], macros: { protein: 84, carbs: 10, fat: 20, calories: 550 } },
  { id: 'm9', name: 'Protein Pancakes', category: 'breakfast', ingredients: [{ id: 'mi40', ingredientId: '10', grams: 100 }, { id: 'mi41', ingredientId: '7', grams: 100 }, { id: 'mi42', ingredientId: '29', grams: 50 }], macros: { protein: 32, carbs: 38, fat: 12, calories: 382 } },
  { id: 'm10', name: 'Savory Breakfast Bowl', category: 'breakfast', ingredients: [{ id: 'mi43', ingredientId: '7', grams: 100 }, { id: 'mi44', ingredientId: '8', grams: 100 }, { id: 'mi45', ingredientId: '4', grams: 50 }, { id: 'mi46', ingredientId: '18', grams: 50 }, { id: 'mi47', ingredientId: '13', grams: 30 }], macros: { protein: 45, carbs: 5, fat: 18, calories: 367 } },
  { id: 'm11', name: 'High-Protein Breakfast Wrap', category: 'breakfast', ingredients: [{ id: 'mi48', ingredientId: '27', grams: 50 }, { id: 'mi49', ingredientId: '8', grams: 150 }, { id: 'mi50', ingredientId: '5', grams: 30 }, { id: 'mi51', ingredientId: '13', grams: 20 }], macros: { protein: 32, carbs: 14, fat: 12, calories: 290 } },
  { id: 'm12', name: 'Greek Yogurt Power Bowl', category: 'breakfast', ingredients: [{ id: 'mi52', ingredientId: '11', grams: 200 }, { id: 'mi53', ingredientId: '26', grams: 100 }, { id: 'mi54', ingredientId: '29', grams: 30 }], macros: { protein: 24, carbs: 38, fat: 3, calories: 279 } },
  { id: 'm13', name: 'Protein Salad Bowl', category: 'lunch', ingredients: [{ id: 'mi55', ingredientId: '1', grams: 150 }, { id: 'mi56', ingredientId: '19', grams: 100 }, { id: 'mi57', ingredientId: '23', grams: 50 }, { id: 'mi58', ingredientId: '21', grams: 50 }, { id: 'mi59', ingredientId: '11', grams: 50 }], macros: { protein: 52, carbs: 12, fat: 7, calories: 317 } },
  { id: 'm14', name: 'Turkey Wraps', category: 'lunch', ingredients: [{ id: 'mi60', ingredientId: '2', grams: 100 }, { id: 'mi61', ingredientId: '27', grams: 50 }, { id: 'mi62', ingredientId: '24', grams: 50 }, { id: 'mi63', ingredientId: '19', grams: 30 }], macros: { protein: 32, carbs: 14, fat: 10, calories: 270 } },
  { id: 'm15', name: 'Tuna Bowl', category: 'lunch', ingredients: [{ id: 'mi64', ingredientId: '6', grams: 150 }, { id: 'mi65', ingredientId: '11', grams: 50 }, { id: 'mi66', ingredientId: '19', grams: 100 }, { id: 'mi67', ingredientId: '23', grams: 50 }], macros: { protein: 44, carbs: 8, fat: 3, calories: 241 } },
  { id: 'm16', name: 'Burrito Bowl', category: 'lunch', ingredients: [{ id: 'mi68', ingredientId: '1', grams: 150 }, { id: 'mi69', ingredientId: '25', grams: 150 }, { id: 'mi70', ingredientId: '36', grams: 50 }, { id: 'mi71', ingredientId: '19', grams: 50 }, { id: 'mi72', ingredientId: '14', grams: 30 }], macros: { protein: 57, carbs: 14, fat: 11, calories: 387 } },
  { id: 'm17', name: 'Chicken Salad', category: 'lunch', ingredients: [{ id: 'mi100', ingredientId: '1', grams: 150 }, { id: 'mi101', ingredientId: '11', grams: 50 }, { id: 'mi102', ingredientId: '23', grams: 50 }, { id: 'mi103', ingredientId: '22', grams: 30 }], macros: { protein: 52, carbs: 9, fat: 7, calories: 309 } },
  { id: 'm18', name: 'Cottage Protein Pudding', category: 'snack', ingredients: [{ id: 'mi73', ingredientId: '10', grams: 150 }, { id: 'mi74', ingredientId: '33', grams: 50 }], macros: { protein: 18, carbs: 7, fat: 3, calories: 129 } },
  { id: 'm19', name: 'Turkey Roll-Ups', category: 'snack', ingredients: [{ id: 'mi75', ingredientId: '2', grams: 100 }, { id: 'mi76', ingredientId: '23', grams: 50 }], macros: { protein: 27, carbs: 2, fat: 8, calories: 203 } },
  { id: 'm20', name: 'Yogurt PB2 Bowl', category: 'snack', ingredients: [{ id: 'mi77', ingredientId: '11', grams: 150 }, { id: 'mi78', ingredientId: '31', grams: 15 }], macros: { protein: 20, carbs: 13, fat: 2, calories: 153 } },
  { id: 'm21', name: 'Cheese & Almonds', category: 'snack', ingredients: [{ id: 'mi79', ingredientId: '13', grams: 30 }, { id: 'mi80', ingredientId: '30', grams: 15 }], macros: { protein: 11, carbs: 4, fat: 12, calories: 159 } },
  { id: 'm22', name: 'Cheesecake Bowl', category: 'dessert', ingredients: [{ id: 'mi81', ingredientId: '10', grams: 150 }, { id: 'mi82', ingredientId: '11', grams: 100 }], macros: { protein: 28, carbs: 11, fat: 3, calories: 183 } },
  { id: 'm23', name: 'Cottage Ice Cream', category: 'dessert', ingredients: [{ id: 'mi83', ingredientId: '10', grams: 200 }, { id: 'mi84', ingredientId: '26', grams: 50 }], macros: { protein: 24, carbs: 15, fat: 4, calories: 201 } }
];

export default function NutritionDashboard() {
  // ============ STATE MANAGEMENT ============
  const [activeView, setActiveView] = useState('planner');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Ingredient Engine State
  const [ingredients, setIngredients] = useState([]);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientFilter, setIngredientFilter] = useState('all');
  
  // Meal Builder State
  const [currentMeal, setCurrentMeal] = useState({ name: '', ingredients: [], category: 'breakfast' });
  const [mealIngredients, setMealIngredients] = useState([]);
  
  // Meal Database State
  const [meals, setMeals] = useState([]);
  const [showMealModal, setShowMealModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealSearch, setMealSearch] = useState('');
  
  // Weekly Planner State
  const [weeklyPlan, setWeeklyPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState('monday');
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [macroGoals, setMacroGoals] = useState({ protein: 150, carbs: 200, fat: 65 });
  
  // Grocery List State
  const [groceryList, setGroceryList] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  
  // Calculator State
  const [bodyweight, setBodyweight] = useState(180);
  const [goal, setGoal] = useState('maintain');
  
  // Workout Tracker State
  const [workouts, setWorkouts] = useState([]);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState({ exercise: '', weight: 0, reps: 0, sets: 0, date: new Date().toISOString().split('T')[0], notes: '' });
  
  // Progress Tracker State
  const [progressLogs, setProgressLogs] = useState([]);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [currentProgress, setCurrentProgress] = useState({ date: new Date().toISOString().split('T')[0], weight: 0, energy: 5, notes: '', mood: 'good' });

  // ============ LOCAL STORAGE PERSISTENCE ============
  useEffect(() => {
    const loadData = () => {
      const stored = {
        ingredients: localStorage.getItem('ingredients'),
        meals: localStorage.getItem('meals'),
        weeklyPlan: localStorage.getItem('weeklyPlan'),
        workouts: localStorage.getItem('workouts'),
        progressLogs: localStorage.getItem('progressLogs'),
        groceryList: localStorage.getItem('groceryList'),
        calorieGoal: localStorage.getItem('calorieGoal'),
        macroGoals: localStorage.getItem('macroGoals'),
        bodyweight: localStorage.getItem('bodyweight'),
        goal: localStorage.getItem('goal'),
      };
      
      if (stored.ingredients) {
        setIngredients(JSON.parse(stored.ingredients));
      } else {
        setIngredients(INITIAL_INGREDIENTS);
      }
      
      if (stored.meals) {
        setMeals(JSON.parse(stored.meals));
      } else {
        setMeals(INITIAL_MEALS);
      }
      if (stored.weeklyPlan) setWeeklyPlan(JSON.parse(stored.weeklyPlan));
      if (stored.workouts) setWorkouts(JSON.parse(stored.workouts));
      if (stored.progressLogs) setProgressLogs(JSON.parse(stored.progressLogs));
      if (stored.groceryList) setGroceryList(JSON.parse(stored.groceryList));
      if (stored.calorieGoal) setCalorieGoal(Number(stored.calorieGoal));
      if (stored.macroGoals) setMacroGoals(JSON.parse(stored.macroGoals));
      if (stored.bodyweight) setBodyweight(Number(stored.bodyweight));
      if (stored.goal) setGoal(stored.goal);
    };
    loadData();
  }, []);

  useEffect(() => { localStorage.setItem('ingredients', JSON.stringify(ingredients)); }, [ingredients]);
  useEffect(() => { localStorage.setItem('meals', JSON.stringify(meals)); }, [meals]);
  useEffect(() => { localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan)); }, [weeklyPlan]);
  useEffect(() => { localStorage.setItem('workouts', JSON.stringify(workouts)); }, [workouts]);
  useEffect(() => { localStorage.setItem('progressLogs', JSON.stringify(progressLogs)); }, [progressLogs]);
  useEffect(() => { localStorage.setItem('groceryList', JSON.stringify(groceryList)); }, [groceryList]);
  useEffect(() => { localStorage.setItem('calorieGoal', calorieGoal); }, [calorieGoal]);
  useEffect(() => { localStorage.setItem('macroGoals', JSON.stringify(macroGoals)); }, [macroGoals]);
  useEffect(() => { localStorage.setItem('bodyweight', bodyweight); }, [bodyweight]);
  useEffect(() => { localStorage.setItem('goal', goal); }, [goal]);

  // ============ HELPER FUNCTIONS ============
  const calculateCalories = (protein, carbs, fat) => {
    return (protein * 4) + (carbs * 4) + (fat * 9);
  };

  const calculateMealMacros = (mealIngredientsList) => {
    return mealIngredientsList.reduce((acc, item) => {
      const ingredient = ingredients.find(i => i.id === item.ingredientId);
      if (!ingredient) return acc;
      const multiplier = item.grams / 100;
      return {
        protein: acc.protein + (ingredient.protein * multiplier),
        carbs: acc.carbs + (ingredient.carbs * multiplier),
        fat: acc.fat + (ingredient.fat * multiplier),
        calories: acc.calories + (ingredient.calories * multiplier),
      };
    }, { protein: 0, carbs: 0, fat: 0, calories: 0 });
  };

  const calculateDayMacros = (day) => {
    const dayMeals = weeklyPlan[day] || { breakfast: null, lunch: null, dinner: null, snack: null, dessert: null };
    return Object.values(dayMeals).reduce((acc, mealId) => {
      if (!mealId) return acc;
      const meal = meals.find(m => m.id === mealId);
      if (!meal) return acc;
      return {
        protein: acc.protein + meal.macros.protein,
        carbs: acc.carbs + meal.macros.carbs,
        fat: acc.fat + meal.macros.fat,
        calories: acc.calories + meal.macros.calories,
      };
    }, { protein: 0, carbs: 0, fat: 0, calories: 0 });
  };

  const calculateTargetCalories = () => {
    const multipliers = { cut: 12, maintain: 15, bulk: 18 };
    return bodyweight * multipliers[goal];
  };

  const generateGroceryList = () => {
    const ingredientCounts = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    days.forEach(day => {
      const dayMeals = weeklyPlan[day] || {};
      Object.values(dayMeals).forEach(mealId => {
        if (!mealId) return;
        const meal = meals.find(m => m.id === mealId);
        if (!meal) return;
        
        meal.ingredients.forEach(item => {
          const ingredient = ingredients.find(i => i.id === item.ingredientId);
          if (!ingredient) return;
          
          if (!ingredientCounts[item.ingredientId]) {
            ingredientCounts[item.ingredientId] = {
              name: ingredient.name,
              category: ingredient.category,
              totalGrams: 0,
            };
          }
          ingredientCounts[item.ingredientId].totalGrams += item.grams;
        });
      });
    });
    
    const list = Object.keys(ingredientCounts).map(id => ({
      id,
      ...ingredientCounts[id],
    }));
    
    setGroceryList(list);
  };

  // ============ COMPONENTS ============
  
  // Stat Card Component
  const StatCard = ({ title, value, unit, icon: Icon, color, trend }) => (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="stat-label">{title}</div>
          <div className="stat-value">
            {value}
            <span className="stat-unit">{unit}</span>
          </div>
          {trend && (
            <div className="stat-trend" style={{ color }}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className="stat-icon" style={{ backgroundColor: `${color}20`, color }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button onClick={onClose} className="modal-close">
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  };

  // Button Component
  const Button = ({ children, variant = 'primary', onClick, disabled, icon: Icon, className = '' }) => (
    <button 
      className={`btn btn-${variant} ${className}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );

  // Input Component
  const Input = ({ label, type = 'text', value, onChange, placeholder, min, max, step }) => (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="input-field"
      />
    </div>
  );

  // Select Component
  const Select = ({ label, value, onChange, options }) => (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <select value={value} onChange={onChange} className="input-field">
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

  // Category Badge
  const CategoryBadge = ({ category }) => {
    const colors = {
      protein: '#00f5ff',
      dairy: '#ff00ff',
      vegetable: '#00ff88',
      'low-carb': '#ffd700',
      snack: '#ff6b6b',
      fruit: '#ff66ff',
      grain: '#ffaa00',
      fat: '#aa88ff',
      breakfast: '#00f5ff',
      lunch: '#00ff88',
      dinner: '#ff00ff',
      dessert: '#ffd700',
    };
    return (
      <span className="category-badge" style={{ backgroundColor: `${colors[category] || '#888'}30`, color: colors[category] || '#888' }}>
        {category}
      </span>
    );
  };

  // ============ VIEW: INGREDIENT ENGINE ============
  const IngredientEngine = () => {
    const filteredIngredients = ingredients.filter(ing => {
      const matchesSearch = ing.name.toLowerCase().includes(ingredientSearch.toLowerCase());
      const matchesFilter = ingredientFilter === 'all' || ing.category === ingredientFilter;
      return matchesSearch && matchesFilter;
    });

    const handleSaveIngredient = () => {
      if (!editingIngredient.name || !editingIngredient.category) return;
      
      const calories = calculateCalories(
        Number(editingIngredient.protein),
        Number(editingIngredient.carbs),
        Number(editingIngredient.fat)
      );
      
      const ingredient = {
        ...editingIngredient,
        protein: Number(editingIngredient.protein),
        carbs: Number(editingIngredient.carbs),
        fat: Number(editingIngredient.fat),
        calories,
      };
      
      if (ingredient.id) {
        setIngredients(ingredients.map(i => i.id === ingredient.id ? ingredient : i));
      } else {
        setIngredients([...ingredients, { ...ingredient, id: Date.now().toString() }]);
      }
      
      setShowIngredientModal(false);
      setEditingIngredient(null);
    };

    const handleDeleteIngredient = (id) => {
      if (window.confirm('Delete this ingredient?')) {
        setIngredients(ingredients.filter(i => i.id !== id));
      }
    };

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Ingredient Database</h1>
            <p className="view-subtitle">Manage your ingredient macro library</p>
          </div>
          <Button 
            icon={Plus}
            onClick={() => {
              setEditingIngredient({ name: '', category: 'protein', protein: 0, carbs: 0, fat: 0 });
              setShowIngredientModal(true);
            }}
          >
            Add Ingredient
          </Button>
        </div>

        <div className="filter-bar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
            />
          </div>
          <select 
            value={ingredientFilter} 
            onChange={(e) => setIngredientFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="protein">Protein</option>
            <option value="dairy">Dairy</option>
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="grain">Grain</option>
            <option value="fat">Fat</option>
            <option value="low-carb">Low-Carb</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Category</th>
                <th>Protein (g)</th>
                <th>Carbs (g)</th>
                <th>Fat (g)</th>
                <th>Calories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map(ing => (
                <tr key={ing.id} className="table-row-animated">
                  <td className="font-semibold">{ing.name}</td>
                  <td><CategoryBadge category={ing.category} /></td>
                  <td><span className="macro-value protein">{ing.protein.toFixed(1)}</span></td>
                  <td><span className="macro-value carbs">{ing.carbs.toFixed(1)}</span></td>
                  <td><span className="macro-value fat">{ing.fat.toFixed(1)}</span></td>
                  <td><span className="macro-value calories">{ing.calories.toFixed(0)}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => {
                          setEditingIngredient(ing);
                          setShowIngredientModal(true);
                        }}
                        className="action-btn edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteIngredient(ing.id)}
                        className="action-btn delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredIngredients.length === 0 && (
            <div className="empty-state">
              <p>No ingredients found. Add your first ingredient to get started!</p>
            </div>
          )}
        </div>

        <Modal 
          isOpen={showIngredientModal} 
          onClose={() => {
            setShowIngredientModal(false);
            setEditingIngredient(null);
          }}
          title={editingIngredient?.id ? 'Edit Ingredient' : 'Add Ingredient'}
        >
          {editingIngredient && (
            <div className="form-grid">
              <Input
                label="Ingredient Name"
                value={editingIngredient.name}
                onChange={(e) => setEditingIngredient({ ...editingIngredient, name: e.target.value })}
                placeholder="e.g., Chicken Breast"
              />
              <Select
                label="Category"
                value={editingIngredient.category}
                onChange={(e) => setEditingIngredient({ ...editingIngredient, category: e.target.value })}
                options={[
                  { value: 'protein', label: 'Protein' },
                  { value: 'dairy', label: 'Dairy' },
                  { value: 'vegetable', label: 'Vegetable' },
                  { value: 'fruit', label: 'Fruit' },
                  { value: 'grain', label: 'Grain' },
                  { value: 'fat', label: 'Fat' },
                  { value: 'low-carb', label: 'Low-Carb' },
                  { value: 'snack', label: 'Snack' },
                ]}
              />
              <Input
                label="Protein (per 100g)"
                type="number"
                step="0.1"
                value={editingIngredient.protein}
                onChange={(e) => setEditingIngredient({ ...editingIngredient, protein: e.target.value })}
              />
              <Input
                label="Carbs (per 100g)"
                type="number"
                step="0.1"
                value={editingIngredient.carbs}
                onChange={(e) => setEditingIngredient({ ...editingIngredient, carbs: e.target.value })}
              />
              <Input
                label="Fat (per 100g)"
                type="number"
                step="0.1"
                value={editingIngredient.fat}
                onChange={(e) => setEditingIngredient({ ...editingIngredient, fat: e.target.value })}
              />
              <div className="input-group">
                <label className="input-label">Calories (Auto-calculated)</label>
                <div className="input-field disabled">
                  {calculateCalories(
                    Number(editingIngredient.protein) || 0,
                    Number(editingIngredient.carbs) || 0,
                    Number(editingIngredient.fat) || 0
                  ).toFixed(0)}
                </div>
              </div>
              <div className="col-span-2 flex gap-3 mt-4">
                <Button onClick={handleSaveIngredient} icon={Save}>
                  Save Ingredient
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowIngredientModal(false);
                    setEditingIngredient(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  };

  // ============ VIEW: MEAL BUILDER ============
  const MealBuilder = () => {
    const mealMacros = calculateMealMacros(mealIngredients);

    const handleAddIngredientToMeal = () => {
      setMealIngredients([...mealIngredients, { id: Date.now().toString(), ingredientId: '', grams: 100 }]);
    };

    const handleUpdateMealIngredient = (id, field, value) => {
      setMealIngredients(mealIngredients.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    };

    const handleRemoveMealIngredient = (id) => {
      setMealIngredients(mealIngredients.filter(item => item.id !== id));
    };

    const handleSaveMeal = () => {
      if (!currentMeal.name || mealIngredients.length === 0) {
        alert('Please add a meal name and at least one ingredient');
        return;
      }

      const validIngredients = mealIngredients.filter(item => item.ingredientId);
      if (validIngredients.length === 0) {
        alert('Please select ingredients');
        return;
      }

      const meal = {
        id: Date.now().toString(),
        name: currentMeal.name,
        category: currentMeal.category,
        ingredients: validIngredients,
        macros: calculateMealMacros(validIngredients),
      };

      setMeals([...meals, meal]);
      setCurrentMeal({ name: '', ingredients: [], category: 'breakfast' });
      setMealIngredients([]);
      alert('Meal saved successfully!');
    };

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Meal Builder</h1>
            <p className="view-subtitle">Construct meals from your ingredients</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h3>Meal Details</h3>
              </div>
              <div className="card-body">
                <div className="form-grid mb-6">
                  <Input
                    label="Meal Name"
                    value={currentMeal.name}
                    onChange={(e) => setCurrentMeal({ ...currentMeal, name: e.target.value })}
                    placeholder="e.g., High Protein Breakfast"
                  />
                  <Select
                    label="Category"
                    value={currentMeal.category}
                    onChange={(e) => setCurrentMeal({ ...currentMeal, category: e.target.value })}
                    options={[
                      { value: 'breakfast', label: 'Breakfast' },
                      { value: 'lunch', label: 'Lunch' },
                      { value: 'dinner', label: 'Dinner' },
                      { value: 'snack', label: 'Snack' },
                      { value: 'dessert', label: 'Dessert' },
                    ]}
                  />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Ingredients</h4>
                  <Button icon={Plus} onClick={handleAddIngredientToMeal}>
                    Add Ingredient
                  </Button>
                </div>

                <div className="space-y-3">
                  {mealIngredients.map(item => {
                    const ingredient = ingredients.find(i => i.id === item.ingredientId);
                    const itemMacros = ingredient ? {
                      protein: (ingredient.protein * item.grams / 100).toFixed(1),
                      carbs: (ingredient.carbs * item.grams / 100).toFixed(1),
                      fat: (ingredient.fat * item.grams / 100).toFixed(1),
                      calories: (ingredient.calories * item.grams / 100).toFixed(0),
                    } : null;

                    return (
                      <div key={item.id} className="ingredient-row">
                        <select
                          value={item.ingredientId}
                          onChange={(e) => handleUpdateMealIngredient(item.id, 'ingredientId', e.target.value)}
                          className="ingredient-select"
                        >
                          <option value="">Select ingredient...</option>
                          {ingredients.map(ing => (
                            <option key={ing.id} value={ing.id}>{ing.name}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={item.grams}
                          onChange={(e) => handleUpdateMealIngredient(item.id, 'grams', Number(e.target.value))}
                          className="grams-input"
                          placeholder="Grams"
                          min="0"
                        />
                        {itemMacros && (
                          <div className="ingredient-macros">
                            <span className="macro-pill protein">P: {itemMacros.protein}g</span>
                            <span className="macro-pill carbs">C: {itemMacros.carbs}g</span>
                            <span className="macro-pill fat">F: {itemMacros.fat}g</span>
                            <span className="macro-pill calories">{itemMacros.calories} cal</span>
                          </div>
                        )}
                        <button 
                          onClick={() => handleRemoveMealIngredient(item.id)}
                          className="remove-btn"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {mealIngredients.length === 0 && (
                  <div className="empty-state-small">
                    Click "Add Ingredient" to start building your meal
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="card sticky top-6">
              <div className="card-header">
                <h3>Meal Totals</h3>
              </div>
              <div className="card-body">
                <div className="macro-display">
                  <div className="macro-item">
                    <div className="macro-label">Protein</div>
                    <div className="macro-number protein">{mealMacros.protein.toFixed(1)}g</div>
                  </div>
                  <div className="macro-item">
                    <div className="macro-label">Carbs</div>
                    <div className="macro-number carbs">{mealMacros.carbs.toFixed(1)}g</div>
                  </div>
                  <div className="macro-item">
                    <div className="macro-label">Fat</div>
                    <div className="macro-number fat">{mealMacros.fat.toFixed(1)}g</div>
                  </div>
                  <div className="macro-item total">
                    <div className="macro-label">Calories</div>
                    <div className="macro-number calories">{mealMacros.calories.toFixed(0)}</div>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveMeal} 
                  icon={Save}
                  className="w-full mt-6"
                >
                  Save to Meal Database
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ VIEW: MEAL DATABASE ============
  const MealDatabase = () => {
    const filteredMeals = meals.filter(meal => 
      meal.name.toLowerCase().includes(mealSearch.toLowerCase())
    );

    const handleDeleteMeal = (id) => {
      if (window.confirm('Delete this meal?')) {
        setMeals(meals.filter(m => m.id !== id));
      }
    };

    const handleCloneMeal = (meal) => {
      setCurrentMeal({ name: `${meal.name} (Copy)`, category: meal.category });
      setMealIngredients([...meal.ingredients]);
      setActiveView('builder');
    };

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Meal Database</h1>
            <p className="view-subtitle">Your saved meal recipes</p>
          </div>
        </div>

        <div className="search-box mb-6">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search meals..."
            value={mealSearch}
            onChange={(e) => setMealSearch(e.target.value)}
          />
        </div>

        <div className="meals-grid">
          {filteredMeals.map(meal => (
            <div key={meal.id} className="meal-card">
              <div className="meal-card-header">
                <div>
                  <h3 className="meal-card-title">{meal.name}</h3>
                  <CategoryBadge category={meal.category} />
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleCloneMeal(meal)} className="action-btn edit">
                    <Copy size={16} />
                  </button>
                  <button onClick={() => handleDeleteMeal(meal.id)} className="action-btn delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="meal-card-body">
                <div className="meal-macros-grid">
                  <div className="meal-macro">
                    <span className="meal-macro-label">Protein</span>
                    <span className="meal-macro-value protein">{meal.macros.protein.toFixed(0)}g</span>
                  </div>
                  <div className="meal-macro">
                    <span className="meal-macro-label">Carbs</span>
                    <span className="meal-macro-value carbs">{meal.macros.carbs.toFixed(0)}g</span>
                  </div>
                  <div className="meal-macro">
                    <span className="meal-macro-label">Fat</span>
                    <span className="meal-macro-value fat">{meal.macros.fat.toFixed(0)}g</span>
                  </div>
                  <div className="meal-macro">
                    <span className="meal-macro-label">Calories</span>
                    <span className="meal-macro-value calories">{meal.macros.calories.toFixed(0)}</span>
                  </div>
                </div>
                <div className="meal-ingredients">
                  <div className="text-xs text-gray-400 mb-2">{meal.ingredients.length} ingredients</div>
                  {meal.ingredients.slice(0, 3).map(item => {
                    const ing = ingredients.find(i => i.id === item.ingredientId);
                    return ing ? (
                      <div key={item.id} className="meal-ingredient-item">
                        {ing.name} ({item.grams}g)
                      </div>
                    ) : null;
                  })}
                  {meal.ingredients.length > 3 && (
                    <div className="text-xs text-gray-400">+{meal.ingredients.length - 3} more</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMeals.length === 0 && (
          <div className="empty-state">
            <p>No meals found. Build your first meal in the Meal Builder!</p>
          </div>
        )}
      </div>
    );
  };

  // ============ VIEW: WEEKLY PLANNER ============
  const WeeklyPlanner = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert'];

    const handleAssignMeal = (day, mealType, mealId) => {
      setWeeklyPlan({
        ...weeklyPlan,
        [day]: {
          ...weeklyPlan[day],
          [mealType]: mealId,
        },
      });
    };

    const weeklyTotals = days.reduce((acc, day) => {
      const dayMacros = calculateDayMacros(day);
      return {
        protein: acc.protein + dayMacros.protein,
        carbs: acc.carbs + dayMacros.carbs,
        fat: acc.fat + dayMacros.fat,
        calories: acc.calories + dayMacros.calories,
      };
    }, { protein: 0, carbs: 0, fat: 0, calories: 0 });

    const targetCalories = calculateTargetCalories();

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Weekly Meal Planner</h1>
            <p className="view-subtitle">Plan your nutrition for the week</p>
          </div>
          <Button icon={ShoppingCart} onClick={generateGroceryList}>
            Generate Grocery List
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Daily Target"
            value={targetCalories.toFixed(0)}
            unit="cal"
            icon={Target}
            color="#00f5ff"
          />
          <StatCard
            title="Weekly Protein"
            value={weeklyTotals.protein.toFixed(0)}
            unit="g"
            icon={TrendingUp}
            color="#ff00ff"
          />
          <StatCard
            title="Weekly Carbs"
            value={weeklyTotals.carbs.toFixed(0)}
            unit="g"
            icon={Activity}
            color="#00ff88"
          />
          <StatCard
            title="Weekly Calories"
            value={weeklyTotals.calories.toFixed(0)}
            unit=""
            icon={TrendingUp}
            color="#ffd700"
          />
        </div>

        <div className="planner-grid">
          {days.map(day => {
            const dayMacros = calculateDayMacros(day);
            const dayPlan = weeklyPlan[day] || {};
            const adherence = (dayMacros.calories / targetCalories * 100).toFixed(0);
            const isBalanced = adherence >= 90 && adherence <= 110;

            return (
              <div key={day} className="day-card">
                <div className="day-card-header">
                  <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                  <div className={`adherence-badge ${isBalanced ? 'balanced' : ''}`}>
                    {adherence}%
                  </div>
                </div>
                <div className="day-card-body">
                  {mealTypes.map(mealType => {
                    const mealId = dayPlan[mealType];
                    const meal = meals.find(m => m.id === mealId);

                    return (
                      <div key={mealType} className="meal-slot">
                        <div className="meal-slot-label">{mealType}</div>
                        <select
                          value={mealId || ''}
                          onChange={(e) => handleAssignMeal(day, mealType, e.target.value || null)}
                          className="meal-slot-select"
                        >
                          <option value="">-- Select --</option>
                          {meals.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))}
                        </select>
                        {meal && (
                          <div className="meal-slot-info">
                            {meal.macros.calories.toFixed(0)} cal
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="day-totals">
                    <div className="day-total-item">
                      <span>P:</span> {dayMacros.protein.toFixed(0)}g
                    </div>
                    <div className="day-total-item">
                      <span>C:</span> {dayMacros.carbs.toFixed(0)}g
                    </div>
                    <div className="day-total-item">
                      <span>F:</span> {dayMacros.fat.toFixed(0)}g
                    </div>
                    <div className="day-total-item total">
                      {dayMacros.calories.toFixed(0)} cal
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ============ VIEW: MACRO TRENDS ============
  const MacroTrends = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    const weeklyData = days.map(day => {
      const macros = calculateDayMacros(day);
      return {
        day: day.slice(0, 3).toUpperCase(),
        protein: Math.round(macros.protein),
        carbs: Math.round(macros.carbs),
        fat: Math.round(macros.fat),
        calories: Math.round(macros.calories),
      };
    });

    const macroRatios = weeklyData.reduce((acc, day) => ({
      protein: acc.protein + day.protein,
      carbs: acc.carbs + day.carbs,
      fat: acc.fat + day.fat,
    }), { protein: 0, carbs: 0, fat: 0 });

    const total = macroRatios.protein + macroRatios.carbs + macroRatios.fat;
    const pieData = [
      { name: 'Protein', value: macroRatios.protein, color: '#00f5ff' },
      { name: 'Carbs', value: macroRatios.carbs, color: '#00ff88' },
      { name: 'Fat', value: macroRatios.fat, color: '#ff00ff' },
    ];

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Macro Trends</h1>
            <p className="view-subtitle">Visualize your weekly nutrition</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3>Daily Macros</h3>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="protein" stroke="#00f5ff" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="carbs" stroke="#00ff88" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="fat" stroke="#ff00ff" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Macro Ratio Distribution</h3>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    formatter={(value) => `${value}g (${(value / total * 100).toFixed(1)}%)`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card lg:col-span-2">
            <div className="card-header">
              <h3>Daily Calories</h3>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="calories" fill="#ffd700" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ VIEW: GROCERY LIST ============
  const GroceryList = () => {
    const groupedByCategory = groceryList.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const handleToggleCheck = (id) => {
      setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
    };

    const handlePrint = () => {
      window.print();
    };

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Grocery List</h1>
            <p className="view-subtitle">Shopping list from your weekly plan</p>
          </div>
          <Button icon={Printer} onClick={handlePrint}>
            Print List
          </Button>
        </div>

        {groceryList.length === 0 ? (
          <div className="empty-state">
            <p>No grocery list generated yet. Go to the Weekly Planner and click "Generate Grocery List".</p>
          </div>
        ) : (
          <div className="grocery-container">
            {Object.keys(groupedByCategory).map(category => (
              <div key={category} className="grocery-category">
                <div className="grocery-category-header">
                  <CategoryBadge category={category} />
                  <span className="grocery-count">{groupedByCategory[category].length} items</span>
                </div>
                <div className="grocery-items">
                  {groupedByCategory[category].map(item => (
                    <div 
                      key={item.id} 
                      className={`grocery-item ${checkedItems[item.id] ? 'checked' : ''}`}
                      onClick={() => handleToggleCheck(item.id)}
                    >
                      <div className="grocery-checkbox">
                        {checkedItems[item.id] && <Check size={16} />}
                      </div>
                      <div className="grocery-item-details">
                        <div className="grocery-item-name">{item.name}</div>
                        <div className="grocery-item-amount">{item.totalGrams.toFixed(0)}g</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ============ VIEW: CALCULATOR ============
  const Calculator = () => {
    const targetCalories = calculateTargetCalories();
    const macros = {
      protein: (targetCalories * 0.3 / 4).toFixed(0),
      carbs: (targetCalories * 0.4 / 4).toFixed(0),
      fat: (targetCalories * 0.3 / 9).toFixed(0),
    };

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Calorie Target Calculator</h1>
            <p className="view-subtitle">Calculate your daily nutrition goals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3>Your Stats</h3>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <Input
                  label="Body Weight (lbs)"
                  type="number"
                  value={bodyweight}
                  onChange={(e) => setBodyweight(Number(e.target.value))}
                />
                <Select
                  label="Goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  options={[
                    { value: 'cut', label: 'Cut (Fat Loss)' },
                    { value: 'maintain', label: 'Maintain' },
                    { value: 'bulk', label: 'Bulk (Muscle Gain)' },
                  ]}
                />
              </div>
              <div className="calculator-info">
                <div className="info-item">
                  <strong>Multiplier:</strong>
                  <span>{goal === 'cut' ? '12x' : goal === 'maintain' ? '15x' : '18x'} bodyweight</span>
                </div>
                <div className="info-item">
                  <strong>Formula:</strong>
                  <span>{bodyweight} lbs × {goal === 'cut' ? '12' : goal === 'maintain' ? '15' : '18'} = {targetCalories.toFixed(0)} calories</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Daily Targets</h3>
            </div>
            <div className="card-body">
              <div className="targets-display">
                <div className="target-item">
                  <div className="target-icon" style={{ backgroundColor: '#00f5ff20', color: '#00f5ff' }}>
                    <Target size={24} />
                  </div>
                  <div className="target-details">
                    <div className="target-label">Calories</div>
                    <div className="target-value">{targetCalories.toFixed(0)}</div>
                  </div>
                </div>
                <div className="target-item">
                  <div className="target-icon" style={{ backgroundColor: '#00f5ff20', color: '#00f5ff' }}>
                    P
                  </div>
                  <div className="target-details">
                    <div className="target-label">Protein</div>
                    <div className="target-value">{macros.protein}g</div>
                  </div>
                </div>
                <div className="target-item">
                  <div className="target-icon" style={{ backgroundColor: '#00ff8820', color: '#00ff88' }}>
                    C
                  </div>
                  <div className="target-details">
                    <div className="target-label">Carbs</div>
                    <div className="target-value">{macros.carbs}g</div>
                  </div>
                </div>
                <div className="target-item">
                  <div className="target-icon" style={{ backgroundColor: '#ff00ff20', color: '#ff00ff' }}>
                    F
                  </div>
                  <div className="target-details">
                    <div className="target-label">Fat</div>
                    <div className="target-value">{macros.fat}g</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ VIEW: WORKOUT TRACKER ============
  const WorkoutTracker = () => {
    const handleSaveWorkout = () => {
      if (!currentWorkout.exercise) return;
      
      const workout = {
        ...currentWorkout,
        id: Date.now().toString(),
        volume: currentWorkout.weight * currentWorkout.reps * currentWorkout.sets,
      };
      
      setWorkouts([...workouts, workout]);
      setCurrentWorkout({ exercise: '', weight: 0, reps: 0, sets: 0, date: new Date().toISOString().split('T')[0], notes: '' });
      setShowWorkoutModal(false);
    };

    const handleDeleteWorkout = (id) => {
      if (window.confirm('Delete this workout?')) {
        setWorkouts(workouts.filter(w => w.id !== id));
      }
    };

    const exerciseGroups = workouts.reduce((acc, w) => {
      if (!acc[w.exercise]) acc[w.exercise] = [];
      acc[w.exercise].push(w);
      return acc;
    }, {});

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Workout Tracker</h1>
            <p className="view-subtitle">Track your strength progression</p>
          </div>
          <Button 
            icon={Plus}
            onClick={() => {
              setCurrentWorkout({ exercise: '', weight: 0, reps: 0, sets: 0, date: new Date().toISOString().split('T')[0], notes: '' });
              setShowWorkoutModal(true);
            }}
          >
            Add Workout
          </Button>
        </div>

        <div className="workouts-grid">
          {Object.keys(exerciseGroups).map(exercise => {
            const exerciseWorkouts = exerciseGroups[exercise].sort((a, b) => new Date(b.date) - new Date(a.date));
            const latest = exerciseWorkouts[0];
            const chartData = exerciseWorkouts.slice(0, 10).reverse().map(w => ({
              date: w.date,
              volume: w.volume,
              weight: w.weight,
            }));

            return (
              <div key={exercise} className="workout-card">
                <div className="workout-card-header">
                  <div>
                    <h3 className="workout-card-title">{exercise}</h3>
                    <div className="workout-card-subtitle">{exerciseWorkouts.length} sessions</div>
                  </div>
                  <div className="workout-icon">
                    <Dumbbell size={24} />
                  </div>
                </div>
                <div className="workout-card-body">
                  <div className="workout-stats">
                    <div className="workout-stat">
                      <span className="workout-stat-label">Latest</span>
                      <span className="workout-stat-value">{latest.weight} lbs × {latest.reps}</span>
                    </div>
                    <div className="workout-stat">
                      <span className="workout-stat-label">Volume</span>
                      <span className="workout-stat-value">{latest.volume.toLocaleString()}</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={chartData}>
                      <Line type="monotone" dataKey="weight" stroke="#00f5ff" strokeWidth={2} dot={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        {workouts.length === 0 && (
          <div className="empty-state">
            <p>No workouts logged yet. Click "Add Workout" to start tracking!</p>
          </div>
        )}

        <Modal 
          isOpen={showWorkoutModal} 
          onClose={() => setShowWorkoutModal(false)}
          title="Log Workout"
        >
          <div className="form-grid">
            <Input
              label="Exercise"
              value={currentWorkout.exercise}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, exercise: e.target.value })}
              placeholder="e.g., Bench Press"
            />
            <Input
              label="Date"
              type="date"
              value={currentWorkout.date}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, date: e.target.value })}
            />
            <Input
              label="Weight (lbs)"
              type="number"
              value={currentWorkout.weight}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, weight: Number(e.target.value) })}
            />
            <Input
              label="Reps"
              type="number"
              value={currentWorkout.reps}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, reps: Number(e.target.value) })}
            />
            <Input
              label="Sets"
              type="number"
              value={currentWorkout.sets}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, sets: Number(e.target.value) })}
            />
            <div className="input-group">
              <label className="input-label">Volume (Auto)</label>
              <div className="input-field disabled">
                {(currentWorkout.weight * currentWorkout.reps * currentWorkout.sets).toLocaleString()}
              </div>
            </div>
            <div className="col-span-2">
              <Input
                label="Notes"
                value={currentWorkout.notes}
                onChange={(e) => setCurrentWorkout({ ...currentWorkout, notes: e.target.value })}
                placeholder="Optional notes..."
              />
            </div>
            <div className="col-span-2 flex gap-3 mt-4">
              <Button onClick={handleSaveWorkout} icon={Save}>
                Save Workout
              </Button>
              <Button variant="secondary" onClick={() => setShowWorkoutModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  // ============ VIEW: PROGRESS TRACKER ============
  const ProgressTracker = () => {
    const handleSaveProgress = () => {
      const log = {
        ...currentProgress,
        id: Date.now().toString(),
      };
      
      setProgressLogs([...progressLogs, log]);
      setCurrentProgress({ date: new Date().toISOString().split('T')[0], weight: 0, energy: 5, notes: '', mood: 'good' });
      setShowProgressModal(false);
    };

    const handleDeleteLog = (id) => {
      if (window.confirm('Delete this log?')) {
        setProgressLogs(progressLogs.filter(l => l.id !== id));
      }
    };

    const sortedLogs = [...progressLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
    const chartData = sortedLogs.map(log => ({
      date: log.date,
      weight: log.weight,
      energy: log.energy,
    }));

    const moodColors = {
      great: '#00ff88',
      good: '#00f5ff',
      okay: '#ffd700',
      poor: '#ff6b6b',
    };

    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h1 className="view-title">Progress Tracker</h1>
            <p className="view-subtitle">Monitor your body composition and energy</p>
          </div>
          <Button 
            icon={Plus}
            onClick={() => {
              setCurrentProgress({ date: new Date().toISOString().split('T')[0], weight: 0, energy: 5, notes: '', mood: 'good' });
              setShowProgressModal(true);
            }}
          >
            Log Progress
          </Button>
        </div>

        {progressLogs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="card">
              <div className="card-header">
                <h3>Weight Trend</h3>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="weight" stroke="#00f5ff" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Energy Levels</h3>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" domain={[0, 10]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="energy" fill="#00ff88" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h3>Progress Logs</h3>
          </div>
          <div className="card-body">
            <div className="progress-logs">
              {sortedLogs.reverse().map(log => (
                <div key={log.id} className="progress-log-item">
                  <div className="progress-log-date">
                    <Calendar size={16} />
                    {log.date}
                  </div>
                  <div className="progress-log-details">
                    <div className="progress-log-stat">
                      <span className="label">Weight:</span>
                      <span className="value">{log.weight} lbs</span>
                    </div>
                    <div className="progress-log-stat">
                      <span className="label">Energy:</span>
                      <span className="value">{log.energy}/10</span>
                    </div>
                    <div className="progress-log-stat">
                      <span className="label">Mood:</span>
                      <span 
                        className="mood-badge" 
                        style={{ 
                          backgroundColor: `${moodColors[log.mood]}30`, 
                          color: moodColors[log.mood] 
                        }}
                      >
                        {log.mood}
                      </span>
                    </div>
                  </div>
                  {log.notes && (
                    <div className="progress-log-notes">{log.notes}</div>
                  )}
                  <button 
                    onClick={() => handleDeleteLog(log.id)}
                    className="action-btn delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            {progressLogs.length === 0 && (
              <div className="empty-state-small">
                No progress logs yet. Start tracking your journey!
              </div>
            )}
          </div>
        </div>

        <Modal 
          isOpen={showProgressModal} 
          onClose={() => setShowProgressModal(false)}
          title="Log Progress"
        >
          <div className="form-grid">
            <Input
              label="Date"
              type="date"
              value={currentProgress.date}
              onChange={(e) => setCurrentProgress({ ...currentProgress, date: e.target.value })}
            />
            <Input
              label="Weight (lbs)"
              type="number"
              step="0.1"
              value={currentProgress.weight}
              onChange={(e) => setCurrentProgress({ ...currentProgress, weight: Number(e.target.value) })}
            />
            <Input
              label="Energy Level (1-10)"
              type="number"
              min="1"
              max="10"
              value={currentProgress.energy}
              onChange={(e) => setCurrentProgress({ ...currentProgress, energy: Number(e.target.value) })}
            />
            <Select
              label="Mood"
              value={currentProgress.mood}
              onChange={(e) => setCurrentProgress({ ...currentProgress, mood: e.target.value })}
              options={[
                { value: 'great', label: 'Great' },
                { value: 'good', label: 'Good' },
                { value: 'okay', label: 'Okay' },
                { value: 'poor', label: 'Poor' },
              ]}
            />
            <div className="col-span-2">
              <Input
                label="Notes"
                value={currentProgress.notes}
                onChange={(e) => setCurrentProgress({ ...currentProgress, notes: e.target.value })}
                placeholder="How are you feeling today?"
              />
            </div>
            <div className="col-span-2 flex gap-3 mt-4">
              <Button onClick={handleSaveProgress} icon={Save}>
                Save Log
              </Button>
              <Button variant="secondary" onClick={() => setShowProgressModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  // ============ MAIN LAYOUT ============
  const navItems = [
    { id: 'planner', label: 'Weekly Planner', icon: Calendar },
    { id: 'ingredients', label: 'Ingredients', icon: Activity },
    { id: 'builder', label: 'Meal Builder', icon: Plus },
    { id: 'meals', label: 'Meal Database', icon: Search },
    { id: 'trends', label: 'Macro Trends', icon: TrendingUp },
    { id: 'grocery', label: 'Grocery List', icon: ShoppingCart },
    { id: 'calculator', label: 'Calculator', icon: Target },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: Activity },
  ];

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <style>{`
        ${GOOGLE_FONTS}
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          color: #fff;
          position: relative;
          overflow-x: hidden;
        }

        .app::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(0, 255, 136, 0.08) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .app-container {
          display: flex;
          position: relative;
          z-index: 1;
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          transition: transform 0.3s ease;
          z-index: 100;
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar-header {
          padding: 0 1.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00f5ff 0%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
        }

        .nav-menu {
          padding: 1rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          color: #888;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
          font-weight: 500;
        }

        .nav-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.1);
          border-left-color: #00f5ff;
        }

        /* Top Bar */
        .topbar {
          position: fixed;
          top: 0;
          left: 280px;
          right: 0;
          height: 70px;
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          z-index: 90;
          transition: left 0.3s ease;
        }

        .topbar.full-width {
          left: 0;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Main Content */
        .main-content {
          margin-left: 280px;
          margin-top: 70px;
          padding: 2rem;
          width: calc(100% - 280px);
          transition: all 0.3s ease;
        }

        .main-content.full-width {
          margin-left: 0;
          width: 100%;
        }

        /* View Container */
        .view-container {
          max-width: 1400px;
          margin: 0 auto;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .view-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #00f5ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .view-subtitle {
          color: #888;
          font-size: 1rem;
        }

        /* Card */
        .card {
          background: rgba(30, 30, 45, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .card:hover {
          border-color: rgba(0, 245, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 245, 255, 0.1);
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-header h3 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .card-body {
          padding: 1.5rem;
        }

        /* Stat Card */
        .stat-card {
          background: rgba(30, 30, 45, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .stat-label {
          color: #888;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
        }

        .stat-unit {
          font-size: 1.25rem;
          color: #888;
          margin-left: 0.25rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-trend {
          font-size: 0.875rem;
          margin-top: 0.5rem;
          font-weight: 600;
        }

        /* Button */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #00f5ff 0%, #00ff88 100%);
          color: #0a0a0f;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 245, 255, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Input */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-label {
          color: #888;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.75rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #00f5ff;
          box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.1);
        }

        .input-field.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input-field::placeholder {
          color: #555;
        }

        /* Form Grid */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .col-span-2 {
          grid-column: span 2;
        }

        /* Search & Filter */
        .filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          transition: all 0.2s ease;
        }

        .search-box:focus-within {
          border-color: #00f5ff;
          box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.1);
        }

        .search-box input {
          flex: 1;
          background: none;
          border: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          outline: none;
        }

        .filter-select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
        }

        /* Table */
        .table-container {
          background: rgba(30, 30, 45, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background: rgba(255, 255, 255, 0.05);
        }

        .data-table th {
          padding: 1rem 1.5rem;
          text-align: left;
          color: #888;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .data-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .table-row-animated {
          transition: all 0.2s ease;
        }

        .table-row-animated:hover {
          background: rgba(0, 245, 255, 0.05);
        }

        /* Category Badge */
        .category-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Macro Values */
        .macro-value {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .macro-value.protein {
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.1);
        }

        .macro-value.carbs {
          color: #00ff88;
          background: rgba(0, 255, 136, 0.1);
        }

        .macro-value.fat {
          color: #ff00ff;
          background: rgba(255, 0, 255, 0.1);
        }

        .macro-value.calories {
          color: #ffd700;
          background: rgba(255, 215, 0, 0.1);
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          padding: 0.5rem;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn.edit:hover {
          background: rgba(0, 245, 255, 0.2);
          color: #00f5ff;
        }

        .action-btn.delete:hover {
          background: rgba(255, 107, 107, 0.2);
          color: #ff6b6b;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          background: rgba(30, 30, 45, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow: auto;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .modal-close {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .modal-body {
          padding: 1.5rem;
        }

        /* Meal Builder */
        .ingredient-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ingredient-select {
          flex: 2;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.5rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
        }

        .grams-input {
          width: 100px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.5rem;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
          text-align: center;
        }

        .ingredient-macros {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .macro-pill {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
        }

        .remove-btn {
          background: rgba(255, 107, 107, 0.2);
          border: none;
          padding: 0.5rem;
          border-radius: 6px;
          color: #ff6b6b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: rgba(255, 107, 107, 0.3);
        }

        .macro-display {
          display: grid;
          gap: 1rem;
        }

        .macro-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .macro-item.total {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.3);
        }

        .macro-label {
          color: #888;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .macro-number {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.75rem;
          font-weight: 700;
        }

        /* Meals Grid */
        .meals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .meal-card {
          background: rgba(30, 30, 45, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .meal-card:hover {
          border-color: rgba(0, 245, 255, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 245, 255, 0.1);
        }

        .meal-card-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .meal-card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .meal-card-body {
          padding: 1.5rem;
        }

        .meal-macros-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .meal-macro {
          text-align: center;
        }

        .meal-macro-label {
          display: block;
          color: #888;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .meal-macro-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .meal-ingredients {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
        }

        .meal-ingredient-item {
          color: #888;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        /* Weekly Planner */
        .planner-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .day-card {
          background: rgba(30, 30, 45, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .day-card-header {
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .day-card-header h3 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .adherence-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.1);
          color: #888;
        }

        .adherence-badge.balanced {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
        }

        .day-card-body {
          padding: 1rem;
        }

        .meal-slot {
          margin-bottom: 1rem;
        }

        .meal-slot-label {
          color: #888;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .meal-slot-select {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.5rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
        }

        .meal-slot-info {
          color: #888;
          font-size: 0.75rem;
          margin-top: 0.25rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .day-totals {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
          margin-top: 1rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .day-total-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          color: #888;
        }

        .day-total-item span {
          color: #fff;
          font-weight: 600;
        }

        .day-total-item.total {
          grid-column: span 2;
          color: #00f5ff;
          font-weight: 700;
        }

        /* Grocery List */
        .grocery-container {
          display: grid;
          gap: 1.5rem;
        }

        .grocery-category {
          background: rgba(30, 30, 45, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .grocery-category-header {
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .grocery-count {
          color: #888;
          font-size: 0.875rem;
        }

        .grocery-items {
          padding: 1rem;
          display: grid;
          gap: 0.5rem;
        }

        .grocery-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .grocery-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .grocery-item.checked {
          opacity: 0.5;
        }

        .grocery-item.checked .grocery-item-name {
          text-decoration: line-through;
        }

        .grocery-checkbox {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .grocery-item.checked .grocery-checkbox {
          background: #00f5ff;
          border-color: #00f5ff;
          color: #0a0a0f;
        }

        .grocery-item-details {
          flex: 1;
        }

        .grocery-item-name {
          font-weight: 600;
        }

        .grocery-item-amount {
          color: #888;
          font-size: 0.875rem;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Calculator */
        .calculator-info {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          color: #888;
        }

        .info-item strong {
          color: #fff;
        }

        .targets-display {
          display: grid;
          gap: 1rem;
        }

        .target-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .target-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .target-details {
          flex: 1;
        }

        .target-label {
          color: #888;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .target-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        /* Workout Cards */
        .workouts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .workout-card {
          background: rgba(30, 30, 45, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .workout-card:hover {
          border-color: rgba(0, 245, 255, 0.3);
          transform: translateY(-4px);
        }

        .workout-card-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .workout-card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .workout-card-subtitle {
          color: #888;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .workout-icon {
          width: 48px;
          height: 48px;
          background: rgba(0, 245, 255, 0.1);
          color: #00f5ff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .workout-card-body {
          padding: 1.5rem;
        }

        .workout-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .workout-stat {
          text-align: center;
        }

        .workout-stat-label {
          display: block;
          color: #888;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .workout-stat-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.125rem;
          font-weight: 700;
          color: #00f5ff;
        }

        /* Progress Logs */
        .progress-logs {
          display: grid;
          gap: 1rem;
        }

        .progress-log-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 1rem;
          display: grid;
          gap: 0.75rem;
          position: relative;
        }

        .progress-log-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #888;
          font-size: 0.875rem;
        }

        .progress-log-details {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .progress-log-stat {
          display: flex;
          gap: 0.5rem;
        }

        .progress-log-stat .label {
          color: #888;
          font-size: 0.875rem;
        }

        .progress-log-stat .value {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          color: #fff;
        }

        .mood-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .progress-log-notes {
          color: #888;
          font-size: 0.875rem;
          font-style: italic;
        }

        .progress-log-item .action-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        /* Empty States */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #888;
        }

        .empty-state-small {
          text-align: center;
          padding: 2rem 1rem;
          color: #888;
          font-size: 0.875rem;
        }

        /* Utilities */
        .grid {
          display: grid;
        }

        .grid-cols-1 {
          grid-template-columns: repeat(1, 1fr);
        }

        .grid-cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .gap-3 {
          gap: 0.75rem;
        }

        .gap-6 {
          gap: 1.5rem;
        }

        .flex {
          display: flex;
        }

        .items-center {
          align-items: center;
        }

        .items-start {
          align-items: flex-start;
        }

        .justify-between {
          justify-content: space-between;
        }

        .space-y-3 > * + * {
          margin-top: 0.75rem;
        }

        .w-full {
          width: 100%;
        }

        .mb-4 {
          margin-bottom: 1rem;
        }

        .mb-6 {
          margin-bottom: 1.5rem;
        }

        .mt-4 {
          margin-top: 1rem;
        }

        .mt-6 {
          margin-top: 1.5rem;
        }

        .font-semibold {
          font-weight: 600;
        }

        .sticky {
          position: sticky;
        }

        .top-6 {
          top: 1.5rem;
        }

        /* Responsive */
        @media (min-width: 1024px) {
          .lg\\:col-span-2 {
            grid-column: span 2;
          }

          .lg\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }

          .lg\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }

          .lg\\:grid-cols-4 {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .topbar {
            left: 0;
          }

          .main-content {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .planner-grid,
          .meals-grid,
          .workouts-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .col-span-2 {
            grid-column: span 1;
          }

          .view-title {
            font-size: 2rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }
        }

        /* Print Styles */
        @media print {
          .sidebar,
          .topbar,
          .view-header button,
          .action-buttons {
            display: none !important;
          }

          .main-content {
            margin: 0;
            width: 100%;
          }

          .card {
            break-inside: avoid;
          }
        }
      `}</style>

      <div className="app-container">
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="logo">MACRO COMMAND</div>
          </div>
          <nav className="nav-menu">
            {navItems.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon size={20} />
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        <div className={`topbar ${!sidebarOpen ? 'full-width' : ''}`}>
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
          </div>
          <div className="topbar-right">
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <main className={`main-content ${!sidebarOpen ? 'full-width' : ''}`}>
          {activeView === 'ingredients' && <IngredientEngine />}
          {activeView === 'builder' && <MealBuilder />}
          {activeView === 'meals' && <MealDatabase />}
          {activeView === 'planner' && <WeeklyPlanner />}
          {activeView === 'trends' && <MacroTrends />}
          {activeView === 'grocery' && <GroceryList />}
          {activeView === 'calculator' && <Calculator />}
          {activeView === 'workouts' && <WorkoutTracker />}
          {activeView === 'progress' && <ProgressTracker />}
        </main>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Camera, Plus, X, Edit2, Trash2, Save, Search, Filter, ChevronDown, Calendar, ShoppingCart, Target, TrendingUp, Dumbbell, Activity, Moon, Sun, Menu, Download, Printer, Copy, Check } from 'lucide-react';

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


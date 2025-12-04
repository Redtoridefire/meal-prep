# MACRO COMMAND 🎯

Ultra-modern meal tracking and macro nutrition dashboard with cyber-luxe aesthetic.

## Features

- 🎯 **38 Pre-populated Ingredients** - Complete with accurate macros
- 🍽️ **22 Pre-populated Meals** - High-protein, low-carb recipes ready to use
- 📊 **Complete Nutrition Tracking** - Ingredient database, meal builder, weekly planner
- 📈 **Visual Analytics** - Beautiful charts for macro trends
- 💪 **Workout & Progress Tracking** - Monitor strength gains and body composition
- 💾 **Offline-First** - All data stored locally in browser
- 🌑 **Dark Mode** - Cyber nutrition aesthetic with neon accents

## Pre-Populated Content

### Ingredients Include:
- **Proteins**: Chicken breast, lean ground turkey, lean beef, turkey sausage, eggs, tuna
- **Dairy**: Low-fat cottage cheese, Greek yogurt, various cheeses
- **Vegetables**: Spinach, bell peppers, zucchini, cauliflower rice, lettuce
- **Low-Carb Items**: Low-carb wraps, PB2, almond milk

### Ready-to-Use Meals:
1. **Dinner Trays**: Chicken Taco, Greek Chicken, Cheeseburger Casserole, Pesto Chicken, Zucchini Lasagna, Philly Cheesesteak, Buffalo Chicken
2. **Breakfasts**: Protein Pancakes, Egg Protein Bake, Savory Bowl, Greek Yogurt Power Bowl
3. **Lunches**: Protein Salad Bowl, Turkey Wraps, Tuna Bowl, Burrito Bowl
4. **Snacks**: Cottage Protein Pudding, Turkey Roll-Ups, Yogurt PB2 Bowl
5. **Desserts**: Cheesecake Bowl, Cottage Ice Cream

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/macro-command)

### Manual Deployment

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: MACRO COMMAND"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/macro-command.git
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy!

3. **Done!** Your app will be live at `https://macro-command.vercel.app`

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: CSS-in-JS with custom cyber aesthetic
- **Storage**: Browser LocalStorage (offline-first)
- **Fonts**: Google Fonts (Rajdhani, DM Sans, JetBrains Mono)

## Usage

1. **Weekly Planner**: Start by selecting meals for each day
2. **Meal Builder**: Create custom meals from ingredients
3. **Grocery List**: Auto-generate shopping list from your weekly plan
4. **Track Progress**: Log workouts, weight, and energy levels
5. **Visualize Data**: View macro trends and daily adherence

## Customization

All data is stored in browser LocalStorage. To reset:
```javascript
localStorage.clear()
// Then refresh the page
```

## Credits

Built with the distinctive "Cyber Nutrition" aesthetic - dark themes, neon accents, and glassmorphism for a futuristic wellness experience.

---

**Ready to command your macros?** 💪

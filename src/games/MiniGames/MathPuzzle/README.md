# Math Puzzle Mini-Games System

## Overview
A comprehensive Phaser.js-based interactive mini-game system for Mathematics lessons from Grade 6 to Grade 12. Each grade level features its own dedicated scene with appropriate math topics and interactive learning elements.

## Structure
```
src/games/MiniGames/MathPuzzle/
├── MathPuzzleGame.tsx          # Main React component and Phaser game configuration
├── scenes/
│   ├── index.ts                # Exports all scenes
│   ├── MainMenuScene.ts        # Main menu with grade selection
│   ├── Grade6Scene.ts          # Grade 6 topics (Fractions, Ratios, etc.)
│   ├── Grade7Scene.ts          # Grade 7 topics (Linear Equations, etc.)
│   ├── Grade8Scene.ts          # Grade 8 topics (Functions, Pythagorean Theorem)
│   ├── Grade9Scene.ts          # Grade 9 topics (Quadratic Functions, etc.)
│   ├── Grade10Scene.ts         # Grade 10 topics (Geometry, Proofs)
│   ├── Grade11Scene.ts         # Grade 11 topics (Advanced Algebra)
│   └── Grade12Scene.ts         # Grade 12 topics (Pre-Calculus)
└── README.md                   # This file
```

## Features

### Game Configuration
- **Phaser 3** game engine
- **800x600** resolution with white background
- **Parent container**: "math-puzzle-container"
- **Arcade physics** enabled
- **Modular scene system** that doesn't affect other games

### Scene Features
- **Interactive buttons** for each math topic per grade
- **Hover effects** and smooth animations
- **Clickable lesson placeholders** with animation spaces
- **Motivational text** encouraging students
- **Back navigation** between scenes
- **Visual feedback** and rewards preparation areas

### Grade-Specific Content

#### Grade 6 (Elementary)
- Fractions & Decimals
- Ratios & Proportions
- Integers
- Basic Geometry
- Data & Statistics
- Algebraic Expressions
- Measurement
- Probability

#### Grade 7 (Middle School)
- Linear Equations
- Inequalities
- Geometry & Angles
- Surface Area & Volume
- Statistics & Probability
- Rational Numbers
- Proportional Relationships
- Scale & Similar Figures

#### Grade 8 (Pre-Algebra)
- Functions & Relations
- Systems of Equations
- Pythagorean Theorem
- Transformations
- Scientific Notation
- Exponents & Roots
- Slope & Linear Functions
- Congruence & Similarity

#### Grade 9 (Algebra I)
- Quadratic Functions
- Factoring Polynomials
- Radical Expressions
- Exponential Functions
- Systems of Inequalities
- Graphing Linear Equations
- Rational Functions
- Data Analysis

#### Grade 10 (Geometry)
- Geometric Proofs
- Circles & Arcs
- Triangles & Trigonometry
- Polygons & Area
- Coordinate Geometry
- 3D Shapes & Volume
- Transformations
- Logic & Reasoning

#### Grade 11 (Algebra II)
- Polynomial Functions
- Logarithmic Functions
- Trigonometric Functions
- Sequences & Series
- Conic Sections
- Matrix Operations
- Complex Numbers
- Statistical Inference

#### Grade 12 (Pre-Calculus)
- Limits & Continuity
- Advanced Trigonometry
- Parametric Equations
- Polar Coordinates
- Vectors & Matrices
- Probability Distributions
- Mathematical Modeling
- Calculus Preparation

## Usage

### Basic Usage
```tsx
import { MathPuzzleGame } from './games/MiniGames'

// Use in your React component
<MathPuzzleGame />
```

### Direct Import
```tsx
import MathPuzzleGame from './games/MiniGames/MathPuzzle/MathPuzzleGame'
```

## Future Development Areas

### Animation & Rewards System
- **Balloon animations** on correct answers
- **Confetti effects** for achievements
- **Star collection** progress tracking
- **Badge system** for topic completion

### Interactive Elements
- **Drag-and-drop** problem solving
- **Visual graphing** tools
- **3D geometric** manipulations
- **Real-time feedback** systems

### Content Expansion
- **Actual math questions** implementation
- **Progressive difficulty** within topics
- **Adaptive learning** paths
- **Performance analytics**

## Technical Notes

### Phaser 3 Integration
- Uses React functional component pattern
- Proper cleanup on component unmount
- Hot module replacement support
- TypeScript support throughout

### Scene Management
- Clean scene transitions
- Proper memory management
- Consistent UI patterns
- Scalable architecture

### Performance
- Optimized for educational environments
- Minimal asset loading
- Efficient rendering
- Cross-browser compatibility

## Dependencies
- React 18+
- Phaser 3.90+
- TypeScript 5+
- Vite (for development)

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

This system provides a solid foundation for interactive mathematics education, with room for extensive content development and feature enhancement.
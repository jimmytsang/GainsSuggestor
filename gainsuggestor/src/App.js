import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, ButtonGroup, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// ... (previous imports)

function App() {
  const [age, setAge] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [goal, setGoal] = useState('maintenance');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [leanBodyMass, setLeanBodyMass] = useState('');
  const [dailyCalories, setDailyCalories] = useState('');
  const [proteinRatio, setProteinRatio] = useState(30);
  const [carbRatio, setCarbRatio] = useState(40);
  const [fatRatio, setFatRatio] = useState(30);
  const [proteinAmount, setProteinAmount] = useState('');
  const [carbAmount, setCarbAmount] = useState('');
  const [fatAmount, setFatAmount] = useState('');
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'

  let initalMealState = { name: '', protein: '', carbs: '', fat: '' };
  let initialMealPlan = {
    monday: { breakfast: '', lunch: '', dinner: '' },
    tuesday: { breakfast: '', lunch: '', dinner: '' },
    wednesday: { breakfast: '', lunch: '', dinner: '' },
    thursday: { breakfast: '', lunch: '', dinner: '' },
    friday: { breakfast: '', lunch: '', dinner: '' },
    saturday: { breakfast: '', lunch: '', dinner: '' },
    sunday: { breakfast: '', lunch: '', dinner: '' },
  };

  Object.keys(initialMealPlan).forEach((day) => {
    Object.keys(initialMealPlan[day]).forEach((meal) => {
      initialMealPlan[day][meal] = initalMealState;
    });
  });
  const [mealPlan, setMealPlan] = useState(initialMealPlan);

  const generateMealPlan = () => {
    if (leanBodyMass && dailyCalories) {
      const daysOfWeek = Object.keys(mealPlan);

      const placeholderMeals = {
        breakfast: { name: 'Omelette', protein: 30, carbs: 10, fat: 15 },
        lunch: { name: 'Chicken Salad', protein: 40, carbs: 20, fat: 10 },
        dinner: { name: 'Grilled Salmon', protein: 25, carbs: 5, fat: 12 },
      };

      const updatedMealPlan = {};

      daysOfWeek.forEach((day) => {
        updatedMealPlan[day] = { ...placeholderMeals };
      });

      setMealPlan(updatedMealPlan);
    }
  };

  const shouldDisplayMetric = () => {
    return unitSystem === 'metric';
  }

  const calculateTDEE = () => {
    if (age && height && weight && gender && goal && activityLevel) {
      let bmr;

      // Convert height and weight to metric units if imperial is selected
      const heightInCm = unitSystem === 'metric' ? height : height * 2.54;
      const weightInKg = unitSystem === 'metric' ? weight : weight * 0.453592;

      // Calculate BMR based on Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      }

      // Apply activity level multiplier to get TDEE
      let tdee;
      switch (activityLevel) {
        case 'sedentary':
          tdee = bmr * 1.2;
          break;
        case 'lightlyActive':
          tdee = bmr * 1.375;
          break;
        case 'moderatelyActive':
          tdee = bmr * 1.55;
          break;
        case 'veryActive':
          tdee = bmr * 1.725;
          break;
        case 'extraActive':
          tdee = bmr * 1.9;
          break;
        default:
          tdee = bmr;
      }

      const fatMass = (bodyFat / 100) * weight;
      const leanMass = weight - fatMass;
      const lbm = leanMass.toFixed(2);
      const dCalories = tdee.toFixed(2);
      const protein = dCalories * (proteinRatio / 100) / 4;
      const carbs = dCalories * (carbRatio / 100) / 4;
      const fat = dCalories * (fatRatio / 100) / 9;
      setLeanBodyMass(leanMass.toFixed(2));
      setDailyCalories(dCalories);
      setProteinAmount((protein).toFixed(2)); // Assuming 1g of protein = 4 calories
      setCarbAmount((carbs).toFixed(2)); // Assuming 1g of carbs = 4 calories
      setFatAmount((fat).toFixed(2)); // Assuming 1g of fat = 9 calories
      generateMealPlan();
    }
  };


  let heightLabel = shouldDisplayMetric ? 'in cm' : 'in inches';
  let weightLabel = shouldDisplayMetric ? 'in kg' : 'in lb';

  return (
    <Container className="mt-5">
      <ButtonGroup className="mb-3">
        <Button
          variant={unitSystem === 'metric' ? 'primary' : 'secondary'}
          onClick={() => setUnitSystem('metric')}
        >
          Metric
        </Button>
        <Button
          variant={unitSystem === 'imperial' ? 'primary' : 'secondary'}
          onClick={() => setUnitSystem('imperial')}
        >
          Imperial
        </Button>
      </ButtonGroup>
      <h1 className="mb-4">Macro Nutrition Calculator</h1>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Height ({heightLabel})</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Weight ({weightLabel})</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Label>Goal</Form.Label>
            <Form.Control
              as="select"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="maintenance">Maintenance</option>
              <option value="bulking">Bulking</option>
              <option value="cutting">Cutting</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Label>Activity Level</Form.Label>
            <Form.Control
              as="select"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightlyActive">Lightly Active</option>
              <option value="moderatelyActive">Moderately Active</option>
              <option value="veryActive">Very Active</option>
              <option value="extraActive">Extra Active</option>
            </Form.Control>
          </Col>
        </Row>
        <Button variant="primary" onClick={calculateTDEE}>
          Calculate TDEE & Macronutrients
        </Button>
      </Form>
      {dailyCalories && proteinAmount && carbAmount && fatAmount && (
        <div className="mt-4">
          <h3>Macronutrient Breakdown:</h3>
          <p>Daily Calories: {dailyCalories} calories</p>
          <p>Protein: {proteinAmount} g</p>
          <p>Carbohydrates: {carbAmount} g</p>
          <p>Fat: {fatAmount} g</p>
        </div>
      )}
      {Object.keys(mealPlan).length > 0 && (
        <div className="mt-4">
          <h3>Meal Plan:</h3>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(mealPlan).map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>
                    {mealPlan[day].breakfast.name} -{' '}
                    {`Protein: ${mealPlan[day].breakfast.protein}g, Carbs: ${mealPlan[day].breakfast.carbs}g, Fat: ${mealPlan[day].breakfast.fat}g`}
                  </td>
                  <td>
                    {mealPlan[day].lunch.name} -{' '}
                    {`Protein: ${mealPlan[day].lunch.protein}g, Carbs: ${mealPlan[day].lunch.carbs}g, Fat: ${mealPlan[day].lunch.fat}g`}
                  </td>
                  <td>
                    {mealPlan[day].dinner.name} -{' '}
                    {`Protein: ${mealPlan[day].dinner.protein}g, Carbs: ${mealPlan[day].dinner.carbs}g, Fat: ${mealPlan[day].dinner.fat}g`}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default App;

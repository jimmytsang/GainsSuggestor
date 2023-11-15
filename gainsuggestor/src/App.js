import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
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
  const [carbRatio, setCarbRatio] = useState(50);
  const [fatRatio, setFatRatio] = useState(20);
  const [proteinAmount, setProteinAmount] = useState('');
  const [carbAmount, setCarbAmount] = useState('');
  const [fatAmount, setFatAmount] = useState('');

  const calculateLeanBodyMass = () => {
    if (weight) {
      const fatMass = (bodyFat / 100) * weight;
      const leanMass = weight - fatMass;
      setLeanBodyMass(leanMass.toFixed(2));
    }
  };

  const calculateTDEE = () => {
    if (age && height && weight && gender && goal && activityLevel) {
      let bmr;

      // Calculate BMR based on Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
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

      calculateLeanBodyMass();
      setDailyCalories(tdee.toFixed(2));
    }
  };

  const calculateMacronutrients = () => {
    if (leanBodyMass && dailyCalories) {
      const protein = (proteinRatio / 100) * leanBodyMass;
      const carbs = (carbRatio / 100) * leanBodyMass;
      const fat = (fatRatio / 100) * leanBodyMass;

      setProteinAmount((protein * 4).toFixed(2)); // Assuming 1g of protein = 4 calories
      setCarbAmount((carbs * 4).toFixed(2)); // Assuming 1g of carbs = 4 calories
      setFatAmount((fat * 9).toFixed(2)); // Assuming 1g of fat = 9 calories
    }
  };

  return (
    <Container className="mt-5">
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
            <Form.Label>Height (in cm)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Weight (in kg)</Form.Label>
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
          Calculate TDEE
        </Button>
        {dailyCalories && (
          <div className="mt-4">
            <Button variant="success" onClick={calculateMacronutrients}>
              Calculate Macronutrients
            </Button>
          </div>
        )}
      </Form>
      {dailyCalories && proteinAmount && carbAmount && fatAmount && (
        <div className="mt-4">
          <h3>Macronutrient Breakdown:</h3>
          <p>Protein: {proteinAmount} calories</p>
          <p>Carbohydrates: {carbAmount} calories</p>
          <p>Fat: {fatAmount} calories</p>
        </div>
      )}
    </Container>
  );
}

export default App;

import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useApi } from '../../../hooks/api';
// import Survey from './pages/Survey';import Survey from './pages/Survey';
// import SurveyStack from './pages/Survey/SurveyStack';
import Survey from './pages/_Survey';

const Dashboard: React.FC = () => {
  const { vehicle, survey } = useApi();

  const [title, setTitle] = useState('');

  const DashboardStack = createStackNavigator();

  useEffect(() => {
    setTitle(survey ? vehicle.plate : 'Vistoria');
  }, [survey, vehicle.plate]);

  return (
    <>
      <Header title={title} back={!survey} />
      <DashboardStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#344955' },
        }}>
        <DashboardStack.Screen name="FindPlate" component={Survey} />
        {/* <DashboardStack.Screen name="Survey" component={SurveyStack} /> */}
      </DashboardStack.Navigator>
    </>
  );
};

export default Dashboard;

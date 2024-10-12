import React, { useState, useEffect, useCallback } from 'react';
import { Stats, StatKey, Scene, User } from './types';
import StatBlock from './components/StatBlock';
import Menu from './components/Menu';
import TrainingCanvas from './components/TrainingCanvas';
import Auth from './components/Auth';
import { getProfile, saveProgress } from './api';

const IDLE_TRAINING_INTERVAL = 6000; // 6 seconds
const SAVE_INTERVAL = 60000; // 1 minute

const initialStats: Stats = {
  strength: 0,
  hp: 100,
  defense: 0,
  intelligence: 0,
  arcanaPower: 0,
};

function App() {
  const [stats, setStats] = useState<Stats>(initialStats);
  const [scene, setScene] = useState<Scene>('train');
  const [lastTrainedStat, setLastTrainedStat] = useState<StatKey | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((userData) => {
          setUser(userData);
          if (userData.stats) {
            setStats(JSON.parse(userData.stats));
          }
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          setToken(null);
          localStorage.removeItem('token');
        });
    }
  }, [token]);

  const trainRandomStat = useCallback(() => {
    const statKeys = Object.keys(stats) as StatKey[];
    const randomStat = statKeys[Math.floor(Math.random() * statKeys.length)];
    setStats((prevStats) => ({
      ...prevStats,
      [randomStat]: prevStats[randomStat] + 1,
    }));
    setLastTrainedStat(randomStat);
  }, [stats]);

  useEffect(() => {
    const intervalId = setInterval(trainRandomStat, IDLE_TRAINING_INTERVAL);
    return () => clearInterval(intervalId);
  }, [trainRandomStat]);

  useEffect(() => {
    if (token) {
      const saveIntervalId = setInterval(() => {
        saveProgress(token, stats)
          .then(() => console.log('Progress saved'))
          .catch((error) => console.error('Error saving progress:', error));
      }, SAVE_INTERVAL);

      return () => clearInterval(saveIntervalId);
    }
  }, [token, stats]);

  const handleManualTrain = () => {
    trainRandomStat();
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setStats(initialStats);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Martial Artist Idle Clicker</h1>
      <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
      {scene === 'train' && (
        <>
          <TrainingCanvas onTrain={handleManualTrain} lastTrainedStat={lastTrainedStat} />
          <div className="mt-8 w-full max-w-md">
            <StatBlock stats={stats} />
          </div>
        </>
      )}
      {scene === 'fight' && <p>Fight scene coming soon!</p>}
      {scene === 'character' && <p>Character customization coming soon!</p>}
      {scene === 'shop' && <p>Shop for Arcana Cards coming soon!</p>}
      <div className="mt-8 w-full max-w-md">
        <Menu setScene={setScene} />
      </div>
    </div>
  );
}

export default App;
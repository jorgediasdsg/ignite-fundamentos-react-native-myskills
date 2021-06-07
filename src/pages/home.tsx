import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native'

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface ISkillData {
  id: string;
  name: string;
}



export function Home(){
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<ISkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill(){

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldState => [...oldState, data])

  }

  function handleRemoveSkill(id: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(()=>{
    const currentHour = new Date().getHours();

    if (currentHour < 12 ){
      setGretting('Good Morning!')
    } else if (currentHour >= 12 && currentHour < 18 ){
      setGretting('Good Afternoon!')
    } else {
      setGretting('Good night!')
    }

  }, [])

  return (
    <View style={styles.container}>
        
        <Text style={styles.title}>
          Welcome Jorge
        </Text>

        <Text style={styles.grettings}>
          {gretting}
        </Text>

        <TextInput 
          style={styles.input}
          placeholder="New skill save"
          placeholderTextColor="#999"
          onChangeText={setNewSkill}
        />

        <Button 
                title="Add" 
                onPress={handleAddNewSkill}
        />

        <Text style={[styles.title, {marginVertical:50}]}>
          My Skills
        </Text>

        <FlatList 
          data={mySkills}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SkillCard 
              skill={item.name}
              onLongPress={() => handleRemoveSkill(item.id)}
            />
          )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
    flex: 1, 
  },
  title: {
    fontSize: 24,
    fontWeight:'bold',
    color: '#FFF'
  },
  input:{
    backgroundColor:'#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  grettings:{
    color:'#FFF'
  }
})
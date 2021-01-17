import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

const Item = ({name, email, bidang, onPress}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.desc}>
        <Text style={styles.descName}>{name}</Text>
        <Text style={styles.descEmail}>{email}</Text>
        <Text style={StyleSheet.descBidang}>{bidang}</Text>
      </View>
      <Text style={styles.delete}>X</Text>
    </TouchableOpacity>
  );
};

const LocalAPI = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bidang, setBidang] = useState('');
  const [users, setUsers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const submit = () => {
    const data = {
      name,
      email,
      bidang,
    };

    if (!isUpdating) {
      axios.post('http://10.0.2.2:3004/users', data).then((response) => {
        console.log('data sent: ', response);
        setName('');
        setEmail('');
        setBidang('');
        getData();
      });
    } else {
      axios
        .patch(`http://10.0.2.2:3004/users/${selectedUser}`, data)
        .then((response) => {
          `response update: ${response}`;
          setName('');
          setEmail('');
          setBidang('');
          getData();
          setIsUpdating(false);
        });
    }
  };

  const getData = () => {
    axios.get('http://10.0.2.2:3004/users').then((res) => setUsers(res.data));
  };

  const selectItem = (item) => {
    setSelectedUser(item.id);
    setName(item.name);
    setEmail(item.email);
    setBidang(item.bidang);
    setIsUpdating(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Local API (JSON Server)</Text>
      <Text>Masukkan Anggota Kabayan Coding</Text>
      <TextInput
        placeholder="Nama Lengkap"
        style={styles.input}
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Bidang"
        style={styles.input}
        value={bidang}
        onChangeText={(value) => setBidang(value)}
      />
      <Button title={!isUpdating ? 'Simpan' : 'Update'} onPress={submit} />
      <View style={styles.line} />
      {users.map((user) => (
        <Item
          key={user.id}
          name={user.name}
          email={user.email}
          bidang={user.bidang}
          onPress={() => selectItem(user)}
        />
      ))}
    </View>
  );
};

export default LocalAPI;

const styles = StyleSheet.create({
  container: {padding: 20},
  textTitle: {textAlign: 'center', marginBottom: 20},
  line: {height: 2, backgroundColor: 'black', marginVertical: 20},
  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 25,
    paddingHorizontal: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  desc: {marginLeft: 18, flex: 1},
  descName: {fontSize: 20, fontWeight: 'bold'},
  descEmail: {fontSize: 16},
  descBidang: {fontSize: 12, marginTop: 8},
  delete: {fontSize: 20, fontWeight: 'bold', color: 'red'},
});

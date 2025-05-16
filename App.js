// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const [nombre, setNombre] = useState('');
	const [nombreGuardado, setNombreGuardado] = useState('');

	useEffect(() => {
		// Al iniciar la app, cargamos el nombre guardado
		const cargarNombre = async () => {
			try {
				const nombreAlmacenado = await AsyncStorage.getItem('miNombre');
				if (nombreAlmacenado !== null) {
					setNombreGuardado(nombreAlmacenado);
				}
			} catch (error) {
				console.log('Error al cargar el nombre:', error);
			}
		};
		cargarNombre();
	}, []);

	const guardarNombre = async () => {
		try {
			await AsyncStorage.setItem('miNombre', nombre);
			setNombreGuardado(nombre);
			setNombre(''); // Limpiamos el input
		} catch (error) {
			console.log('Error al guardar el nombre:', error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Guardar nombre con AsyncStorage</Text>
			<TextInput
				style={styles.input}
				placeholder="Escribe tu nombre"
				value={nombre}
				onChangeText={setNombre}
			/>
			<Button title="Guardar nombre" onPress={guardarNombre} />
			<Text style={styles.resultado}>
				{nombreGuardado
					? `Nombre guardado: ${nombreGuardado}`
					: 'No hay nombre guardado aún.'}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	titulo: {
		fontSize: 20,
		marginBottom: 20,
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#777',
		padding: 10,
		marginBottom: 10,
	},
	resultado: {
		marginTop: 20,
		fontSize: 16,
	},
});

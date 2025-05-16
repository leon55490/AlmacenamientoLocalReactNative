// App.js
import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect desde la librería de React
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Importa componentes básicos de la interfaz desde React Native
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para guardar datos localmente

export default function App() {
	// Exporta el componente principal App como componente por defecto
	const [nombre, setNombre] = useState(''); // Declara una variable de estado 'nombre' y su función para actualizarla, inicializada como cadena vacía
	const [nombreGuardado, setNombreGuardado] = useState(''); // Declara otra variable de estado para el nombre guardado, también inicializada como cadena vacía

	useEffect(() => {
		// useEffect se ejecuta una vez al montar el componente
		// Al iniciar la app, cargamos el nombre guardado
		const cargarNombre = async () => {
			// Función asincrónica para obtener el nombre almacenado
			try {
				const nombreAlmacenado = await AsyncStorage.getItem('miNombre'); // Intenta obtener el valor de la clave 'miNombre' del almacenamiento local
				if (nombreAlmacenado !== null) {
					// Si existe un valor almacenado...
					setNombreGuardado(nombreAlmacenado); // ...se actualiza el estado 'nombreGuardado' con ese valor
				}
			} catch (error) {
				console.log('Error al cargar el nombre:', error); // Muestra en consola si ocurre un error al cargar el nombre
			}
		};
		cargarNombre(); // Llama a la función para cargar el nombre
	}, []); // El array vacío indica que el efecto se ejecuta solo una vez, cuando se monta el componente

	const guardarNombre = async () => {
		// Función asincrónica para guardar el nombre ingresado
		try {
			await AsyncStorage.setItem('miNombre', nombre); // Guarda en el almacenamiento local el valor de 'nombre' bajo la clave 'miNombre'
			setNombreGuardado(nombre); // Actualiza el estado 'nombreGuardado' con el nuevo nombre
			setNombre(''); // Limpia el campo de entrada (resetea 'nombre' a cadena vacía)
		} catch (error) {
			console.log('Error al guardar el nombre:', error); // Muestra en consola si ocurre un error al guardar el nombre
		}
	};

	return (
		// Devuelve el contenido visual del componente App
		<View style={styles.container}>
			{' '}
			{/* Contenedor principal con estilo */}
			<Text style={styles.titulo}>Guardar nombre con AsyncStorage</Text>{' '}
			{/* Título de la app */}
			<TextInput
				style={styles.input} // Aplica estilo al campo de texto
				placeholder="Escribe tu nombre" // Texto de ejemplo que se muestra cuando el input está vacío
				value={nombre} // El valor actual del input es el estado 'nombre'
				onChangeText={setNombre} // Cada vez que se escribe algo, actualiza 'nombre' con lo escrito
			/>
			<Button title="Guardar nombre" onPress={guardarNombre} />{' '}
			{/* Botón que llama a la función guardarNombre al presionarse */}
			<Text style={styles.resultado}>
				{' '}
				{/* Muestra un mensaje con el nombre guardado o un mensaje por defecto */}
				{nombreGuardado
					? `Nombre guardado: ${nombreGuardado}` // Si hay un nombre guardado, lo muestra
					: 'No hay nombre guardado aún.'}{' '}
				// Si no hay, muestra este mensaje
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	// Objeto que contiene estilos para los componentes
	container: {
		// Estilo para el contenedor principal
		flex: 1, // Ocupa todo el alto disponible
		justifyContent: 'center', // Centra verticalmente el contenido
		paddingHorizontal: 20, // Añade espacio horizontal (izquierda y derecha)
	},
	titulo: {
		// Estilo para el título
		fontSize: 20, // Tamaño de letra
		marginBottom: 20, // Espacio inferior
		textAlign: 'center', // Centra el texto horizontalmente
	},
	input: {
		// Estilo para el TextInput
		borderWidth: 1, // Borde de 1 punto
		borderColor: '#777', // Color gris para el borde
		padding: 10, // Relleno interno
		marginBottom: 10, // Espacio inferior
	},
	resultado: {
		// Estilo para el texto que muestra el resultado
		marginTop: 20, // Espacio superior
		fontSize: 16, // Tamaño de letra
	},
});

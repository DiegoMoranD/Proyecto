import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { backgroundColor: "#fff", padding: 40, fontSize: 12, fontFamily: "Times-Roman" },
    header: { borderBottom: "2px solid #000", paddingBottom: 8, marginBottom: 20 },
    clinicName: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
    clinicInfo: { fontSize: 10, textAlign: "center", color: "#555" },
    patientInfo: { marginBottom: 15 },
    label: { fontWeight: "bold" },
    prescriptionBox: { border: "1px solid #000", padding: 15, minHeight: 100, marginBottom: 20, marginTop: 20 },
    footer: { marginTop: 30, textAlign: "center", fontSize: 10, color: "#555" },
    signatureBox: { marginTop: 100, textAlign: "center" },
});

const userString = sessionStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const RecetaPDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.clinicName}>Clínica {data.empresaNombre}</Text>
                <Text style={styles.clinicInfo}>Dr {user.name} {user.paterno} | Tel: {user.telefono}</Text>
            </View>
            <View style={styles.patientInfo}>
                <Text>
                    <Text style={styles.label}>Paciente:</Text> {data.paciente}
                </Text>
                <Text>
                    <Text style={styles.label}>Fecha:</Text> {data.fecha}
                </Text>
                <Text>
                    <Text style={styles.label}>Peso:</Text> {data.peso} kg
                </Text>
                <Text>
                    <Text style={styles.label}>Altura:</Text> {data.altura} m
                </Text>
                <Text>
                    <Text style={styles.label}>IMC:</Text> {data.imc}
                </Text>
                <Text>
                    <Text style={styles.label}>Síntomas:</Text> {data.sintomas}
                </Text>
                <Text>
                    <Text style={styles.label}>Alergias:</Text> {data.alergias}
                </Text>
                <Text>
                    <Text style={styles.label}>Diagnóstico:</Text> {data.diagnostico}
                </Text>
                <Text>
                    <Text style={styles.label}>Recomendaciones:</Text> {data.recomendaciones}
                </Text>
            </View>
            <View style={styles.prescriptionBox}>
                <Text style={styles.label}>Medicamentos Recetados:</Text>
                {data.medicamentos && data.medicamentos.length > 0 ? (
                    data.medicamentos.map((med, idx) => (
                        <Text key={idx}>
                            - {med.nombre} | Indicaciones: {med.indicaciones}
                        </Text>
                    ))
                ) : (
                    <Text>No se recetaron medicamentos.</Text>
                )}
            </View>
            <View style={styles.signatureBox}>
                <Text>____________________________</Text>
                <Text>Médico Responsable</Text>
                <Text>Cédula Profesional: {data.empresaCedula}</Text>
            </View>
            <Text style={styles.footer}>
                *** Esta receta es válida únicamente con la firma y sello del médico ***
            </Text>
        </Page>
    </Document>
);

export default RecetaPDF;
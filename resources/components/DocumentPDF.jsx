import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    PDFDownloadLink,
} from "@react-pdf/renderer";

// Estilos de receta médica
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        padding: 40,
        fontSize: 12,
        fontFamily: "Times-Roman",
    },
    header: {
        borderBottom: "2px solid #000",
        paddingBottom: 8,
        marginBottom: 20,
    },
    clinicName: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 4,
    },
    clinicInfo: {
        fontSize: 10,
        textAlign: "center",
        color: "#555",
    },
    patientInfo: {
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
    },
    prescriptionBox: {
        border: "1px solid #000",
        padding: 15,
        minHeight: 200,
        marginBottom: 20,
        marginTop:20
    },
    footer: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 10,
        color: "#555",
    },
    signatureBox: {
        marginTop: 200,
        textAlign: "center",
    },
});

// Documento PDF con formato de receta médica
const MedicalPrescription = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.clinicName}>Clínica ATE 6</Text>
                <Text style={styles.clinicInfo}>
                    Dr Pedro Castillo | Tel: 322-112-5451
                </Text>
            </View>

            {/* Datos del paciente */}
            <View style={styles.patientInfo}>
                <Text>
                    <Text style={styles.label}>Paciente:</Text> Juan Pérez
                </Text>
                <Text>
                    <Text style={styles.label}>Edad:</Text> 35 años
                </Text>
                <Text>
                    <Text style={styles.label}>Fecha:</Text> 13/08/2025
                </Text>
            </View>

            {/* Receta */}
            <View style={styles.prescriptionBox}>
                <Text style={styles.label}>Prescripción:</Text>
                <Text>- Paracetamol 500mg, 1 tableta cada 8 horas por 5 días.</Text>
                <Text>- Ibuprofeno 400mg, 1 tableta cada 12 horas si hay dolor.</Text>
            </View>

            {/* Firma */}
            <View style={styles.signatureBox}>
                <Text>____________________________</Text>
                <Text>Médico Responsable</Text>
                <Text>Cédula Profesional: 1234567</Text>
            </View>

            {/* Pie de página */}
            <Text style={styles.footer}>
                *** Esta receta es válida únicamente con la firma y sello del médico ***
            </Text>
        </Page>
    </Document>
);

function DocumentPDF() {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Receta Médica</h2>

            {/* Vista previa */}
            <PDFViewer width="100%" height="900">
                <MedicalPrescription />
            </PDFViewer>

            {/* Botón de descarga */}
            <div style={{ marginTop: "20px" }}>
                <PDFDownloadLink
                    document={<MedicalPrescription />}
                    fileName="receta_medica.pdf"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "5px",
                        textDecoration: "none",
                    }}
                >
                    {({ loading }) =>
                        loading ? "Generando receta..." : "Descargar Receta"
                    }
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default DocumentPDF;

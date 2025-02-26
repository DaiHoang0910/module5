import React, { useEffect, useState } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import { getEditHistory } from "../services/api";

const EditHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const data = await getEditHistory();
            console.log("Edit history data:", data); // Debug log
            setHistory(data);
        } catch (error) {
            console.error("Error fetching edit history:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
                <p>Loading edit history...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center">Edit History</h2>
            <Table striped bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Previous Title</th>
                    <th>Previous Category</th>
                    <th>Updated At</th>
                </tr>
                </thead>
                <tbody>
                {history.length > 0 ? (
                    history.map((entry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.title}</td>
                            <td>{entry.category}</td>
                            <td>{entry.previousTitle || "N/A"}</td>
                            <td>{entry.previousCategory || "N/A"}</td>
                            <td>{new Date(entry.updatedAt).toLocaleString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">No edit history available</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
};

export default EditHistory;

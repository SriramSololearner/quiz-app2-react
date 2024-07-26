import { Box, Container, Typography, ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import React, { useState } from "react";
import Data from "../Data.json";
import Quiz from "../Components/Quiz";
import { red } from "@mui/material/colors";

interface Istate {
    currentQuestion: number;
    Score: number;
    ShowScore: boolean;
    selectedValue: string[];
    isSelected: boolean;
}

const theme = createTheme({
    palette: {
        primary: { main: "#374151", light: red[100] },
        secondary: { main: "#FDB827" },
        mode: "light"
    }
})



const Landing = () => {
    const [currentQuestion, setCurrentQuestion] =
        useState<Istate["currentQuestion"]>(0);
    const [selectedValue, setSelectedValue] = useState<Istate["selectedValue"]>(
        Array(Data.length).fill("")
    );
    const [score, setScore] = useState<Istate["Score"]>(0);
    const [showScore, setShowScore] = useState<Istate["ShowScore"]>(false);

    

    const res = Data.reduce(
        (
            acc: number,
            curr: {
                Question: string;
                Option: string[];
                Answer: string;
                score: number;
            }
        ) => {
            acc = acc + curr.score;
            return acc;
        },
        0
    );

    console.log(selectedValue)

    const handlerNext = () => {
        if (currentQuestion === 8 && selectedValue.every((val) => val === ""
        )) return alert("Please Attempt atleast one!");

        if (currentQuestion + 1 < Data.length) {
            setCurrentQuestion((prev) => prev + 1);
        }
        else {
            setShowScore(true)
        }
    };


    const handlerPrev = () => {
        if (currentQuestion !== 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
        if (
            selectedValue[currentQuestion] !== Data[currentQuestion].Answer &&
            score > 0
        ) {
            setScore((prev) => prev - 1);
        }
    };

    const ChangeHandler = (param: string) => {
        let updatedValues = [...selectedValue];
        updatedValues[currentQuestion] = param;
        setSelectedValue(updatedValues);
        Data[currentQuestion].isAttempted = true
        if (param === Data[currentQuestion].Answer) {
            Data[currentQuestion].score = 1
        }
        else {
            Data[currentQuestion].score = 0
        }
    };

    const restartHandler = () => {
        setShowScore(false);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedValue(Array(Data.length).fill(""));
        window.location.reload();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={styles.container}>
                <Box sx={styles.containerBox}>
                    <Typography sx={styles.Header} >Quiz App </Typography>

                    {showScore ? (
                        // score Board
                        <Box sx={styles.ScoreContainer}>
                            <Typography variant="h5" sx={styles.Text}>
                                Congratulations You have successfully completed 👍
                            </Typography>
                            <Typography variant="h5">
                                YourScore:{" "}
                                <Box component={"span"} color={"green"} fontWeight={"bold"}>
                                    {res}

                                </Box>
                            </Typography>
                            <Typography
                                component="button"
                                sx={styles.button}
                                onClick={restartHandler}
                            >
                                {" "}
                                Restart
                            </Typography>
                        </Box>
                    ) : (

                        // Quiz Board
                        <>
                            <Box sx={styles.NumbersContainer}>
                                {Data.map((obj, ind) => (
                                    <Typography key={ind}
                                        component={"button"}
                                        onClick={() => setCurrentQuestion(ind)}
                                        sx={Data[ind].isAttempted ? { ...styles.displayNumber, opacity: 1, background: "red", color: "white" } : styles.displayNumber}
                                    >
                                        {" "}
                                        {ind + 1}
                                    </Typography>
                                ))}
                            </Box>
                            <Quiz
                                currentQuestion={currentQuestion}
                                question={Data[currentQuestion].Question}
                                choices={Data[currentQuestion].Option}
                                answer={Data[currentQuestion]?.Answer}
                                selected={selectedValue}
                                handlerNext={handlerNext}
                                handlerPrev={handlerPrev}
                                ChangeHandler={ChangeHandler}
                            />
                        </>
                    )}
                </Box>
            </Container>
        </ThemeProvider>

    );
};

export default Landing;

const styles = {
    Header: {
        position: "relative",
        top: "2%",
        color: 'black',
        fontSize: "2em",
        fontWeight: 900,
    },
    container: {
        transition: "all 0.5s ease"
    },
    containerBox: {
        bgcolor: "#a8ddf7",
        height: "100vh",
        borderRadius: { sx: "20px", sm: "50%", lg: "50%" },

    },
    NumbersContainer: {
        position: "relative",
        top: "10%",
    },

    Text: {
        color: "#f06c1f",
        fontWeight: "bold",
    },

    displayNumber: {
        p: "5px 15px",
        textAlign: "center",
        borderRadius: "100%",
        border: "none",
        outline: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        m: "4px",
        opacity: "0.5",
        "&:hover": {
            opacity: "0.9",
            transform: "scale(1.1)",
        },
    },

    ScoreContainer: {
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
    },
    button: {
        p: "8px 18px",
        color: "#0253e8",
        fontWeight: "bold",
        borderRadius: "10px",
        border: "none",
        transition: "all 1s ease",
        "&:hover": {
            backgroundColor: "#4895fa",
            color: "white",
        },
    },
};

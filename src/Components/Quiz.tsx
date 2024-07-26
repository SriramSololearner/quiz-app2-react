import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

interface Iprops {
    currentQuestion: number,
    question: string,
    choices: string[],
    answer: string | undefined,
    handlerNext: () => void,
    handlerPrev: () => void,
    ChangeHandler: (param: string) => void,
    selected: string[]
}


const Quiz = ({ currentQuestion, question, choices, answer, handlerNext, handlerPrev, ChangeHandler, selected }: Iprops) => {

    return (
        <Box sx={styles.root}>
            <Typography component={'h4'} sx={styles.question} >
                {question}
            </Typography>
            <Box sx={styles.radioContainer} >
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    {choices.map((choice, i) => (
                        <FormControlLabel
                            value={choice}
                            key={i}
                            checked={selected[currentQuestion] === choice}
                            onChange={() => ChangeHandler(choice)}
                            control={<Radio />}
                            label={choice} sx={styles.radio} />
                    ))}
                </RadioGroup>
            </Box>
            <Box sx={styles.buttonGroup}>
                <Button variant="outlined" disabled={currentQuestion <= 0} onClick={handlerPrev} sx={styles.button}>Prev</Button>
                {/* <Button variant="outlined" onClick={handlerNext} sx={styles.button}>Next</Button>    */}
                {currentQuestion === 8 ? <Button variant="outlined" onClick={handlerNext} sx={styles.button}>Submit</Button> : <Button variant="outlined" onClick={handlerNext} sx={styles.button}>Next</Button>}
            </Box>
        </Box>
    )
}

export default Quiz

const styles = {
    root: {
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        gap: "20px"
    },
    question: {
        fontSize: "20px",
        color: "red",
        fontWeight: "bold"

    },
    radioContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

    },
    radio: {
        border: " 2ps solid red",
    },
    buttonGroup: {

        display: 'flex',
        gap: "80px",

    },
    button: {
        color: "red",
        fontWeight: 'bold',
        transition: 'all 1s ease',
        "&:hover": {
            backgroundColor: "#0253e8",
            color: "white"
        }
    }
}
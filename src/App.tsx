import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

import styles from "./Styles.module.css";

interface FinalWord {
    letter: string;
    contais: boolean;
    rightPlace: boolean;
}

function App() {
    const [word, setWord] = useState<string>("");
    const [tries, setTries] = useState<FinalWord[][]>([]);
    const goalWord = ["i", "d", "e", "i", "a"];

    function wordBrakdown() {
        const letters = word.split("");
        const newArray: FinalWord[] = [];
        letters.forEach((letter, index) => {
            const isInTheRightPlace = letter === goalWord[index];
            const obj: FinalWord = {
                letter,
                contais: goalWord.includes(letter),
                rightPlace: isInTheRightPlace,
            };
            newArray.push(obj);
        });
        setTries([...tries, newArray]);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && word.length === 5) {
            wordBrakdown();
            setWord("");
        }
    }

    function isOver() {
        let rightLetter = [];
        if (tries.length > 0) {
            tries[tries.length - 1].forEach((letter) => {
                if (letter.rightPlace) {
                    rightLetter.push(letter.letter);
                }
            });

            if (rightLetter.length === 5) {
                return true;
            }

            if (tries.length === 6) {
                return true;
            }
        }
        return false;
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setWord(e.target.value.replace(/[^a-zA-Z]/gi, ""));
    }

    return (
        <>
            <h1>Woordle</h1>

            {!isOver() && (
                <input
                    value={word}
                    className={styles.input}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    type="text"
                    maxLength={5}
                />
            )}

            <div className={styles.triesMainContainer}>
                {tries.map((guess) => (
                    <div key={Math.random()} className={styles.triesContainer}>
                        {guess.map((letter) => (
                            <p
                                key={letter.letter + Math.random()}
                                className={`${styles.letter} ${
                                    letter.contais && styles.contains
                                } ${letter.rightPlace && styles.rightPlace}`}
                            >
                                {letter.letter}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;

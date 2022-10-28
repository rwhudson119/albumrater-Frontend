import React, { useState, useEffect, PureComponent } from "react";


const [results, setResults] = useState(null);
const [artist, setArtist] = useState("");
const [country, setCountry] = useState("");
const [title, setTitle] = useState("");
const [releaseDate, setReleaseDate] = useState("");
const [coverPhoto, setCoverPhoto] = useState("");
const [genre, setGenre] = useState("");
const [artwork, setArtwork] = useState(5);
const [originality, setOriginality] = useState(50);
const [flow, setFlow] = useState(50);
const [lyrics, setLyrics] = useState(50);
const [howCaptivating, setHowCaptivating] = useState(50);
const [timelessness, setTimelessness] = useState(50);
const [music, setMusic] = useState(50);
const [delivery, setDelivery] = useState(50);
const [expectation, setExpectation] = useState(50);
const [notes, setNotes] = useState("");
const [songScores, setSongScores] = useState([]);
const [songDuration, setSongDuration] = useState([]);
const [totalDuration, setTotalDuration] = useState(null);

export function handleSliderChangeArtwork(event, newValue) {
    setArtwork(newValue);
}

export function handleInputChangeArtwork(event) {
    setArtwork(event.target.value === '' ? '' : Number(event.target.value));
}

export function handleSliderChangeExpectation(event, newValue) {
    setExpectation(newValue);
}

export function handleInputChangeExpectation(event) {
    setExpectation(event.target.value === '' ? '' : Number(event.target.value));
}


export function handleSliderChangeOriginality(event, newValue) {
    setOriginality(newValue);
};

export function handleInputChangeOriginality(event) {
    setOriginality(event.target.value === '' ? '' : Number(event.target.value));
};

export function handleSliderChangeFlow(event, newValue) {
    setFlow(newValue);
};

export function handleInputChangeFlow(event) {
    setFlow(event.target.value === '' ? '' : Number(event.target.value));
};

export function handleSliderChangeLyrics(event, newValue) {
    setLyrics(newValue);
};

export function handleInputChangeLyrics(event) {
    setLyrics(event.target.value === '' ? '' : Number(event.target.value));
};

export function handleSliderChangeHowCaptivating(event, newValue) {
    setHowCaptivating(newValue);
};

export function handleInputChangeHowCaptivating(event) {
    setHowCaptivating(event.target.value === '' ? '' : Number(event.target.value));
};

export function handleSliderChangeTimelessness(event, newValue) {
    setTimelessness(newValue);
};

export function handleInputChangeTimelessness(event) {
    setTimelessness(event.target.value === '' ? '' : Number(event.target.value));
};

export function handleSliderChangeDelivery(event, newValue) {
    setDelivery(newValue);
};

export function handleInputChangeDelivery(event) {
    setDelivery(event.target.value === '' ? '' : Number(event.target.value));
};

export function handleSliderChangeMusic(event, newValue) {
    setMusic(newValue);
};

export function handleInputChangeMusic(event) {
    setMusic(event.target.value === '' ? '' : Number(event.target.value));
};

export function handleInputChangeNotes(event) {
    setNotes(event.target.value);
};
export function handleInputChangeTitle(event) {
    setTitle(event.target.value);
};
export function handleInputChangeArtist(event) {
    setArtist(event.target.value);
};

export function handleInputChangeCountry(event) {
    setCountry(event.target.value);
};


export function handleInputChangeGenre(event) {
    setGenre(event.target.value);
};
export function handleInputChangeRelease_Date(event) {
    setReleaseDate(event.target.value);
};


export function handleBlurArtwork() {
    if (artwork < 0) {
        setArtwork(0);
    } else if (artwork > 10) {
        setArtwork(10);
    }
};

export function handleBlurExpectation() {
    if (expectation < 0) {
        setExpectation(0);
    } else if (expectation > 100) {
        setExpectation(100);
    }
};


export function handleBlurOriginality() {
    if (originality < 0) {
        setOriginality(0);
    } else if (originality > 100) {
        setOriginality(100);
    }
};
export function handleBlurFlow() {
    if (flow < 0) {
        setFlow(0);
    } else if (flow > 100) {
        setFlow(100);
    }
};
export function handleBlurLyrics() {
    if (lyrics < 0) {
        setLyrics(0);
    } else if (lyrics > 100) {
        setLyrics(100);
    }
};
export function handleBlurHowCaptivating() {
    if (howCaptivating < 0) {
        setHowCaptivating(0);
    } else if (howCaptivating > 100) {
        setHowCaptivating(100);
    }
};
export function handleBlurTimelessness() {
    if (timelessness < 0) {
        setTimelessness(0);
    } else if (timelessness > 100) {
        setTimelessness(100);
    }
};

export function handleBlurDelivery() {
    if (delivery < 0) {
        setDelivery(0);
    } else if (delivery > 100) {
        setDelivery(100);
    }
};

export function handleBlurMusic() {
    if (music < 0) {
        setMusic(0);
    } else if (music > 100) {
        setMusic(100);
    }
};
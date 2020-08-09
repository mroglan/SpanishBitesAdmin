import {ObjectId} from 'mongodb'


export interface Event {
    title: string;
    desc: string;
    location: string;
    image: string;
    date: string; 
}

export interface TimePeriod {
    name: string;
    dateRange: string[]; // beginning and end date
    spainEvents: Event[];
    worldEvents: Event[];
}

export interface DBTimePeriod extends TimePeriod {
    _id: ObjectId;
}

export interface ClientTimePeriod extends TimePeriod {
    _id: string;
}


interface AuthorInfluence {
    name: string;
    link: string;
}

interface RelevantWork extends AuthorInfluence {}

export interface Reference extends AuthorInfluence {}

export interface Author {
    firstName: string;
    lastName: string;
    keyPoints: string[];
    relevantWorks: RelevantWork[];
    influences: AuthorInfluence[];
    birthDate: string;
    deathDate: string;
    detailedInfo: string; // PREMIUM ONLY
}

export interface DBAuthor extends Author {
    _id: ObjectId;
    timePeriod: ObjectId;
}

export interface ClientAuthor extends Author {
    _id: string;
    timePeriod: string;
}


export interface Genre {
    name: string;
}

export interface ClientGenre extends Genre {
    _id: string;
}

export interface DBGenre extends Genre {
    _id: ObjectId;
}


export interface Book {
    title: string;
    desc: string;
    detailedInfo: string; // PREMIUM ONLY
}

export interface DBBook extends Book {
    _id: ObjectId;
    genres: ObjectId[]; 
    authors: ObjectId[]; 
    timePeriod: ObjectId;
}

export interface ClientBook extends Book {
    _id: string;
    genres: string[];
    authors: string[];
    timePeriod: string;
}

export interface VocabWord {
    term: string;
    def: string;
}

interface Passage {
    name: string;
    desc: string;
    englishText: string;
    spanishText: string;
    commentary: string;
    vocab: VocabWord[];
    annotations: string; // link to a pdf
}

export interface DBPassage extends Passage {
    _id: ObjectId;
    book: ObjectId; 
}

export interface ClientPassage extends Passage {
    _id: string;
    book: string;
}

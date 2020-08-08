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

interface DBQueryAuthor extends Omit<DBAuthor, 'timePeriod'> {
    timePeriod: ObjectId;
}

interface ClientQueryAuthor extends Omit<ClientAuthor, 'timePeriod'> {
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
    genre: ObjectId; 
    author: ObjectId; 
    timePeriod: ObjectId;
}

export interface ClientBook extends Book {
    _id: string;
    genre: string;
    author: string;
    timePeriod: string;
}

interface DBQueryBook extends Omit<DBBook, 'genre' | 'author' | 'timePeriod'> {
    genre: ObjectId;
    author: ObjectId;
    timePeriod: ObjectId;
}

interface ClientQueryBook extends Omit<ClientBook, 'genre' | 'author' | 'timePeriod'> {
    genre: string;
    author: string;
    timePeriod: string;
}


interface Passage {
    text: string;
    commentary: string; // comes from text-editor
    annotations: string; // link to a pdf
}

export interface DBPassage extends Passage {
    _id: ObjectId;
    book: DBQueryBook; // aggregate
}

export interface ClientPassage extends Passage {
    _id: string;
    book: ClientQueryBook;
    author: ClientQueryAuthor; // populate from book
    timePeriod: ClientTimePeriod; // populate from book
    genre: ClientGenre; // populate from book
}

interface DBQueryPassage extends Passage {
    _id: ObjectId;
    book: ObjectId;
}

interface ClientQueryPassage extends Passage {
    _id: string;
    book: string;
}

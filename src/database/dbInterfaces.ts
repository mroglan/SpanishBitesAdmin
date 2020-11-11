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
    intro: string;
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
    image: string;
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
    image: string;
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


export interface User {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isVerified: boolean;
}

export interface DBUser extends User {
    _id: ObjectId;
}


export interface SpanishBite {
    name: string; // just for admin to keep track of them
    author: string;
    image: string;
    work: string; // book, poem, etc.
    text: string;
    desc: string;
    dates: string[];
}

export interface DBSpanishBite extends SpanishBite {
    _id: ObjectId;
}

export interface ClientSpanishBite extends SpanishBite {
    _id: string;
}


export interface DBDailyEvent {
    date: Date;
    bite: ObjectId;
    _id: ObjectId;
}

export interface ClientDailyEvent {
    date: string;
    bite: string;
    _id: string;
}


export interface BlogPost {
    title: string;
    subtitle: string;
    content: string;
    releaseDate: string;
    keyWords: string[];
}

export interface DBBlogPost extends BlogPost {
    _id: ObjectId;
}

export interface ClientBlogPost extends BlogPost {
    _id: string;
}
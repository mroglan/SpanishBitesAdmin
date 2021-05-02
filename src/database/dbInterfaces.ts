import {query as q} from 'faunadb'

interface Ref {
    ref: typeof q.Collection;
    id: string;
}

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

export interface DBTimePeriod {
    ref: Ref;
    ts: number;
    data: TimePeriod;
}

export interface OrganizedDBTimePeriod extends TimePeriod {
    _id: string;
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
    birthDate: string;
    deathDate: string;
    image: string;
    detailedInfo?: string; // PREMIUM ONLY
}

export interface DBUnpopulatedAuthor {
    ref: Ref;
    ts: number;
    data: Author & {timePeriod: Ref}
}

export interface DBUnpopulatedOrganizedAuthor extends Author {
    _id: string;
    timePeriod: Ref;
}

export interface DBAuthor {
    ref: Ref;
    ts: number;
    data: Author & {timePeriod: OrganizedDBTimePeriod}
}

export interface OrganizedDBAuthor extends Author {
    _id: string;
    timePeriod: OrganizedDBTimePeriod;
}

export interface ClientAuthor extends Author {
    _id: string;
    timePeriod: ClientTimePeriod;
}

export interface ClientUnpopulatedAuthor extends Author {
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
    ref: Ref;
    ts: number;
    data: Genre;
}

interface OrganizedDBGenre extends Genre {
    _id: string;
}


export interface Book {
    title: string;
    desc: string;
    image: string;
    detailedInfo: string; // PREMIUM ONLY
}

export interface DBUnpopulatedBook {
    ref: Ref;
    data: Book & {timePeriod: Ref; genres: Ref[]; authors: Ref[]};
}

export interface OrganizedDBAuthorPopulatedBook extends Book {
    _id: string;
    genres: Ref[];
    timePeriod: Ref;
    authors: OrganizedDBAuthor[];
}

export interface OrganizedDBGenreAndTimePeriodPopulatedBook extends Book {
    _id: string;
    genres: OrganizedDBGenre[];
    timePeriod: OrganizedDBTimePeriod;
    authors: Ref[];
}

export interface DBBook {
    ref: Ref;
    ts: number;
    data: Book & {genres: OrganizedDBGenre[]; authors: OrganizedDBAuthor[]; timePeriod: OrganizedDBTimePeriod};
}

export interface OrganizedDBBook extends Book {
    _id: string;
    genres: OrganizedDBGenre[]; 
    authors: OrganizedDBAuthor[]; 
    timePeriod: OrganizedDBTimePeriod;
}

export interface ClientBook extends Book {
    _id: string;
    genres: ClientGenre[];
    authors: ClientAuthor[];
    timePeriod: ClientTimePeriod;
}

export interface AuthorPopulatedClientBook extends Book {
    _id: string;
    genres: string[];
    authors: ClientAuthor[];
    timePeriod: string;
}

export interface ClientUnpopulatedBook extends Book {
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
    commentary?: string; // PREMIUM ONLY
    vocab: VocabWord[];
    annotations?: string; // PREMIUM ONLY
}

export interface DBPassage {
    ref: Ref;
    ts: number;
    data: {book: DBUnpopulatedBook; }
}

export interface OrganizedDBPassage extends Passage {
    _id: string;
    book: DBUnpopulatedBook; 
    authors?: DBUnpopulatedOrganizedAuthor[];
}

export interface DBBookPopulatedPassage extends Passage {
    _id: string;
    book: OrganizedDBGenreAndTimePeriodPopulatedBook;
    authors: DBUnpopulatedOrganizedAuthor[];
}

export interface ClientPassage extends Passage {
    _id: string;
    book: {_id: string; genres: string[]; authors: string[]; timePeriod: string; title: string; desc: string; image: string; detailedInfo: string;};
    authors?: ClientUnpopulatedAuthor[];
}

export interface FullyPopulatedClientPassage extends Passage {
    _id: string;
    book: ClientBook;
    authors?: ClientUnpopulatedAuthor[];
}


export interface GeneralItem {
    type: string;
    id: string;
}

export interface User {
    username: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isVerified: boolean;
    premiumExpiration: string;
    previews: GeneralItem[];
    recentlyViewed: GeneralItem[];
    image: string;
}

export interface DBUser {
    ref: Ref;
    ts: number;
    data: User;
}

export interface OrganizedDBUser extends User {
    _id: string;
}

export interface ClientCookieUser {
    username: string;
    name: string;
    email: string;
    premiumExpeiration: string;
    preview: GeneralItem[];
    image: string;
    _id: string;
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

export interface DBSpanishBite {
    ref: Ref;
    ts: number;
    data: SpanishBite;
}

export interface OrganizedDBSpanishBite extends SpanishBite {
    _id: string;
}

export interface ClientSpanishBite extends SpanishBite {
    _id: string;
}


export interface DailyEvent {
    date: string;
}

export interface DBDailyEvent {
    ref: Ref;
    ts: number;
    data: DailyEvent & {bite: Ref};
} 

export interface OrganizedDBEvent extends DailyEvent {
    _id: string;
    bite: string;
}

export interface ClientDailyEvent extends DailyEvent {
    bite: string;
    _id: string;
}


export interface VerificationToken {
    token: string;
    userInfo: {
        name: string;
        email: string;
        password: string;
    }
}

export interface DBVerificationToken {
    ref: Ref;
    ts: number;
    data: VerificationToken;
}

export interface OrganizedDBVerificationToken extends VerificationToken {
    _id: string;
}


export interface PasswordResetToken {
    token: string;
    email: string;
    userId: string;
}

export interface DBPasswordResetToken {
    ref: Ref;
    ts: number;
    data: PasswordResetToken;
}

export interface OrganizedDBPasswordResetToken extends PasswordResetToken {
    _id: string;
}


export interface ClubEvent {
    bookName: string;
    bookAuthor: string;
    bookDesc: string;
    bookImage: string;
    month: string;
    year: string;
    posts: Ref[];
    meetings: {date: string; users: Ref[]}[];
}

export interface OrganizedDBClubEvent extends ClubEvent {
    _id: string;
}

export interface ClientClubEvent extends ClubEvent {
    _id: string;
}


export interface Survey {
    name: string;
    responses: any[];
}

export interface DBSurvey {
    ref: Ref;
    ts: number;
    data: Survey;
}

export interface ClientSurvey extends Survey {
    _id: string;
}


export interface RecentlyViewedItem {
    id: string;
    type: string;
}


export interface ContactMessage {
    name: string;
    email: string;
    type: string;
    message: string;
}
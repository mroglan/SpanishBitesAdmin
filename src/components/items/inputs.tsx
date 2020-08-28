import {OutlinedInput, InputAdornment, IconButton, FormControl, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {useState, useRef, KeyboardEvent} from 'react'
import { id } from 'date-fns/esm/locale';

const useStyles = makeStyles(theme => ({
    searchButton: {

    }
}))

type OnSearch = (val:string) => void;

export const SearchInput = ({onSearch}:{onSearch: OnSearch}) => {

    const [search, setSearch] = useState('')

    const searchRef = useRef<HTMLButtonElement>()

    const handleKeyPress = (e:KeyboardEvent) => {
        if(e.key === 'Enter') searchRef.current.click()
    }

    const classes = useStyles() 
    return (
        <Box>
            <FormControl variant="outlined">
                <OutlinedInput id="search-bar" placeholder="Search..." onKeyPress={handleKeyPress}
                value={search} onChange={(e) => setSearch(e.target.value.toString())} margin="dense" color="secondary"
                startAdornment={
                    <InputAdornment position="start">
                        <IconButton aria-label="Search" onClick={() => onSearch(search)} className={classes.searchButton}
                        edge="start" ref={searchRef}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                } endAdornment={Boolean(search) && <InputAdornment position="end">
                    <IconButton aria-label="Clear Search" onClick={() => {
                        setSearch('')
                        onSearch('')
                    }} className={classes.searchButton} edge="end">
                        <CloseIcon />
                    </IconButton>
                </InputAdornment>} />
            </FormControl>
        </Box>
    )
}
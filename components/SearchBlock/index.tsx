import React, {useState} from "react";
import styles from './SearchBlock.module.scss'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {IconButton} from "@mui/material";
import {Api} from "../../utils/api";
import {SearchUsers} from "./SearchUsers";
import {SearchArticles} from "./SearchArticles";

export const SearchBlock = () => {
    const [searchOption, setSearchOption] = useState<'users' | 'articles' | null>(null)
    const [searchStr, setSearchStr] = useState('')
    const [array, setArray] = useState([])

    const searchUsers = async () => {
        const [data, count] = await Api().users.getAllUsers(10, 1, searchStr)
        setArray(data)
    }
    const searchArticles = async () => {
        const [data, count] = await Api().article.getArticles(10, 1, searchStr)
        setArray(data)
    }
    const toggleOption = (option) => {
        return () => {
            setSearchOption(option)
            setSearchStr('')
        }
    }
    return (
        <div>
            {
                !searchOption &&
                <div className={styles.searchOptionButtonWrapper}>
                    <IconButton style={{color:'#fff'}} onClick={toggleOption('users')}>
                        <PersonSearchIcon/>
                    </IconButton>
                    <IconButton style={{color:'#fff'}} onClick={toggleOption('articles')}>
                        <ManageSearchIcon/>
                    </IconButton>
                </div>
            }
            {
                searchOption === 'users' &&

                <SearchUsers toggleOption={toggleOption(null)} usersData={array} searchHandler={searchUsers}
                             searchStr={searchStr}
                             setSearchStr={setSearchStr} setArray={setArray}/>

            }
            {
                searchOption === 'articles' &&
                <SearchArticles toggleOption={toggleOption(null)} articlesData={array} searchHandler={searchArticles}
                                searchStr={searchStr}
                                setSearchStr={setSearchStr} setArray={setArray}/>
            }
        </div>
    )
}
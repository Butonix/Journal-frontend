import React from 'react';
import {Button} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import {Api} from "../../utils/api";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";

interface FollowButtonProps {
    id: number
}

export const FollowButton: React.FC<FollowButtonProps> = ({id}) => {
    const currentUser = useAppSelector(selectUserData)
    const [followed, setFollowed] = React.useState(currentUser?.following.some(el => el === id));
    const toggleFollow = () => {
        !followed ? followUser() : unfollowUser()
    }
    const unfollowUser = async () => {
        const response = await Api().users.unfollowUser({id: id})
        setFollowed(prev => !prev)
    }
    const followUser = async () => {
        const response = await Api().users.followUser({id: +id})
        setFollowed(prev => !prev)
    }
    return (
        <Button
            onClick={toggleFollow}
            variant="contained"
            >
            {!followed ? <AddIcon/> : <CheckIcon style={{fontSize: 20, color: '#2ea83a'}}/>}
        </Button>
    );
};

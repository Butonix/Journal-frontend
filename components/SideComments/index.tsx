import React, {useState} from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';

const items = [
    {
        user: {
            fullname: 'Вася Пупкин',
        },
        text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
        post: {
            title: 'Какая у вас дома ванна?',
        },
    },
    {
        user: {
            fullname: 'Вася Пупкин',
        },
        text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
        post: {
            title: 'Какая у вас дома ванна?',
        },
    },
    {
        user: {
            fullname: 'Вася Пупкин',
        },
        text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
        post: {
            title: 'Какая у вас дома ванна?',
        },
    },
];

interface CommentItemProps {
    user: {
        fullname: string;
    };
    text: string;
    post: {
        title: string;
    };
}

const CommentItem: React.FC<CommentItemProps> = ({user, text, post}) => {
    return (
        <div className={styles.commentItem}>
            <div className={styles.userInfo}>
                <img
                    src="https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/"/>
                <a href="#">
                    <b>{user.fullname}</b>
                </a>
            </div>
            <p className={styles.text}>{text}</p>
            <a href="#">
                <span className={styles.postTitle}>{post.title}</span>
            </a>
        </div>
    );
};

export const SideComments = () => {
    const [isVisible,setIsVisible] = useState(true)
    const toggleVisible = () => {
        setIsVisible(prev=>!prev)
    }

    return (
        <div className={isVisible?styles.root:styles.rootRotate}>
            <div className={isVisible ? styles.commentTitle : styles.commentTitleRotate}>
                <h3 onClick={toggleVisible}>
                    Комментарии
                </h3>
                <ArrowRightIcon/>
            </div>

            {isVisible && items.map((obj) => (
                <CommentItem key={obj.text} {...obj} />
            ))}
        </div>
    );
};

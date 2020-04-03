import React from "react";

import {
    TabPanel,
    ScrollPanelComments,
    CommentContainer,
    AddCommentText,
    CommentButtonContainer,
    AddCommentButton
} from "./../../../../route-view.style";

import { commentService } from "@services";
import { useTranslation } from "react-i18next";

const Comments = ({ comments, webId, route }) => {

    //const [selectedWaypoint, setSelectedWaypoint] = React.useState(0);

    const [commentText, setCommentText] = React.useState("");

    const { t } = useTranslation();

    const handleChange = event => {
        setCommentText(event.target.value);
    };

    const postComment = () => {
        const comment = {
            content: commentText,
            date: Date.now(),
            //waypoint: selectedWaypoint
        };

        commentService.postComment(webId, comment, route);

        setCommentText("");
    };

    return (
        <TabPanel>
            <ScrollPanelComments>
                {comments &&
                    comments.map((c, index) => {
                        return (
                            <p key={index}>
                                {c.content} - {c.author}
                            </p>
                        );
                    })}
            </ScrollPanelComments>

            {!comments && (
                <p className="no-data">{t("route.no_comments")}</p>
            )}
            <CommentContainer>
                <AddCommentText
                    value={commentText}
                    onChange={handleChange}
                    placeholder="¿Qué opinas?"
                />
                <CommentButtonContainer>
                    <AddCommentButton title={t("route.select_point")}>
                        <img src="img/icon/marker/0.svg" alt="Choose point" />
                    </AddCommentButton>

                    <AddCommentButton
                        value={commentText}
                        onClick={postComment}
                        title="Comentar">

                        <img src="img/icon/send.svg" alt="Send message" />
                    </AddCommentButton>
                </CommentButtonContainer>
            </CommentContainer>
        </TabPanel>
    );
};

//<WaypointsDropdown {...{ route }}/>

export default Comments;
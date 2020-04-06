import React from 'react';

import { useTranslation } from 'react-i18next';
import { userService, groupService } from '@services';

import {
    GroupHolderHeader,
    GroupHolderWrapper,
    DetailsButton
} from './group-holder.style';

import { FeedContext } from '../../../../feed.component';

const GroupHolder = ({ group, onGroupSelected, setSelectedGroup }) => {
    const { t } = useTranslation();

    const onDetails = () => {
        setSelectedGroup(group);
        onGroupSelected();
    }

    return (
        <FeedContext.Consumer>
            {props => (
                <GroupHolderWrapper>
                    <GroupHolderHeader>
                        <span className="friend-title">{group.name}</span>
                    </GroupHolderHeader>
                    <DetailsButton onClick = { onDetails }>
                            {'See details'}
                    </DetailsButton>
                </GroupHolderWrapper>
            )}
        </FeedContext.Consumer>
    );
};

export default GroupHolder;
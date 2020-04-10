import React from 'react';
import { render, cleanup } from 'react-testing-library';
import GroupHolder from './group-holder.component';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import { FeedContext } from '../../../../feed.component';

import 'jest-dom/extend-expect';

const group = {
    name: "Grupo A",
    members: "https://marcosav2.inrupt.net/profile/card#me",
    date: 1529644667834,
    owner: 'https://marcosav.inrupt.net/profile/card#me'
}

describe('GroupHolder', () => {
    afterAll(cleanup);

    const { container } = render(
        <RouteMapContext.Provider>
            <FeedContext.Provider>
                <GroupHolder {...{ group }} />
            </FeedContext.Provider>
        </RouteMapContext.Provider>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
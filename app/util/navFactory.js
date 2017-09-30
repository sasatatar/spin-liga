export function navFactory(isAdmin=false) {
    return [{
        text: 'Home',
        url: '~/leagues',
        showSubmenu: true,
        items: [{ 
            text: 'Players',
            url: '~/players',
        },{
            text: 'Results',
            url: '~/games'
        }, {
            text: 'Rankings',
            url: '~/ranking'
        }]
    },{
        text: 'About',
        url: '~/about'
    }, {
        text: 'Admin',
        url: '~/admin',
        showSubmenu: isAdmin,
        items: [{ 
            text: 'Leagues',
            url: '~/admin/leagues',
        },{ 
            text: 'Players',
            url: '~/admin/players',
        },{
            text: 'Games',
            url: '~/admin/games'
        }]
    }];
}



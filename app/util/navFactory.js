export function navFactory(isAdmin=false) {
    return [{
        text: 'Home',
        url: '~/leagues',
        showSubmenu: true,
        items: [{ 
            text: 'Igrači',
            url: '~/players',
        },{
            text: 'Rezultati',
            url: '~/games'
        }, {
            text: 'Rang lista',
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
            text: 'Lige',
            url: '~/admin/leagues',
        },{ 
            text: 'Igrači',
            url: '~/admin/players',
        },{
            text: 'Rezultati',
            url: '~/admin/games'
        }, {
            text: 'Rang lista',
            url: '~/admin/ranking'
        }]
    }];
}



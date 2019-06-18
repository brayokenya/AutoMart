const passwordHash = '$2b$10$nQuQ2nT.fnEbsCJpGHdJ5OyBzbtjpsbvDWbAYEY.TIQduHZdejsUi';

const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        passwordHash,
        address: '17 John Street, Lagos, Nigeria.',
        isAdmin: true
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@gmail.com',
        passwordHash,
        address: '17 Jane Stree, Edo State, Nigeria.',
        isAdmin: false
    },
    {
        firstName: 'Ricardo',
        lastName: 'Kaka',
        email: 'ricardokaka@gmail.com',
        passwordHash,
        address: '22 Rio, Brazil.',
        isAdmin: false
    },
    {
        firstName: 'Frank',
        lastName: 'Lampard',
        email: 'franklampard@gmail.com',
        passwordHash,
        address: '8 London, England.',
        isAdmin: false
    },
    {
        firstName: 'Rui',
        lastName: 'Costa',
        email: 'ruicosta@gmail.com',
        passwordHash,
        address: '10 Milan, Italy.',
        isAdmin: false
    },
    {
        firstName: 'Osahon',
        lastName: 'Oboite',
        email: 'osahonoboite@gmail.com',
        passwordHash,
        address: 'Lagos, Nigeria',
        isAdmin: true
    }
];

export default users;

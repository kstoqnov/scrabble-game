
export let bagOfLetters = () => {

    return [

        ...Array(9).fill({letter: 'А', value: 1}),
        ...Array(9).fill({letter: 'О', value: 1}),
        ...Array(8).fill({letter: 'Е', value: 1}),
        ...Array(8).fill({letter: 'И', value: 1}),
        ...Array(5).fill({letter: 'Т', value: 1}),
        ...Array(4).fill({letter: 'Н', value: 1}),
        ...Array(4).fill({letter: 'П', value: 1}),
        ...Array(4).fill({letter: 'Р', value: 1}),
        ...Array(4).fill({letter: 'С', value: 1}),
    
        ...Array(4).fill({letter: 'В', value: 2}),
        ...Array(4).fill({letter: 'Д', value: 2}),
        ...Array(4).fill({letter: 'М', value: 2}),
        ...Array(3).fill({letter: 'Б', value: 2}),
        ...Array(3).fill({letter: 'К', value: 2}),
        ...Array(3).fill({letter: 'Л', value: 2}),
    
        ...Array(3).fill({letter: 'Г', value: 3}),
        ...Array(2).fill({letter: 'Ъ', value: 3}),
    
        ...Array(2).fill({letter: 'Ж', value: 4}),
        ...Array(2).fill({letter: 'З', value: 4}),
        
        ...Array(3).fill({letter: 'У', value: 5}),
        ...Array(2).fill({letter: 'Ч', value: 5}),
        ...Array(2).fill({letter: 'Я', value: 5}),
        ...Array(1).fill({letter: 'Й', value: 5}),
        ...Array(1).fill({letter: 'Х', value: 5}),
    
        ...Array(1).fill({letter: 'Ц', value: 8}),
        ...Array(1).fill({letter: 'Ш', value: 8}),
        ...Array(1).fill({letter: 'Ю', value: 8}),
         
    
        ...Array(1).fill({letter: 'Ф', value: 10}),
        ...Array(1).fill({letter: 'Щ', value: 10}),
        ...Array(1).fill({letter: 'Ь', value: 10}),
    
        ...Array(2).fill({letter: '*', value: null})
    
    ];

};


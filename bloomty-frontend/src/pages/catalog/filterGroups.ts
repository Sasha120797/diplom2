export const FILTER_GROUPS = [
    {
        name: 'price',
        title: 'Цена',
        options: [
            { value: 'do-10000r', label: 'до 3 500 ₽' },
            { value: 'do-40000r', label: 'до 7 000 ₽' },
            { value: 'bolche-40000r', label: 'свыше 7 000 ₽' }
        ]
    },
    {
        name: 'type',
        title: 'Тип изделия',
        options: [
            { value: 'Платья', label: 'Платья' },
            { value: 'Юбки', label: 'Юбки' },
            { value: 'Брюки', label: 'Брюки' },
            { value: 'Рубашки', label: 'Рубашки' },
            { value: 'Футболки', label: 'Футболки' },
            { value: 'Свитера', label: 'Свитера' },
            { value: 'Верхняя одежда', label: 'Верхняя одежда' },
            { value: 'Другое', label: 'Другое' },
        ]
    },
    {
        name: 'color',
        title: 'Ткань',
        options: [
            { value: 'Велюр', label: 'Велюр' },
            { value: 'Хлопок', label: 'Хлопок' },
            { value: 'Лен', label: 'Лен' },
            { value: 'Шелк', label: 'Шелк' },
            { value: 'Синтетика', label: 'Синтетика' },
        ]
    },
    {
        name: 'category',
        title: 'Категория',
        options: [
            { value: 'hit', label: 'Хит' },
            { value: 'sale', label: 'Скидка' }
        ]
    }
];
export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Текст скопирован в буфер обмена');
        // Здесь можно показать уведомление пользователю
    } catch (error) {
        console.error('Не удалось скопировать текст:', error);
        // Резервный метод через document.execCommand (для старых браузеров)
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            console.log('Текст скопирован (резервный метод)');
        } catch (fallbackError) {
            console.error('Не удалось скопировать текст даже резервным способом:', fallbackError);
            throw new Error('Не удалось скопировать текст');
        }
    }
};
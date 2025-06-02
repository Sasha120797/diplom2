import { useEffect, useState } from "react"
import './searchPage.css'
import { IProduct } from "../../types/Product";
import { ProductRequests } from "../../axios/productRequests";
import { useAppDispatch } from "../../store/storeHooks";
import { addError } from "../../store/errors/errors";
import ProductCard from "../../components/productCard/productCard";

const SearchPage = () => {

    const dispatch = useAppDispatch();

    const [searchString, setSearchString] = useState('');

    const [findedProducts, setFindedProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        if (searchString) {
            ProductRequests.findProducts(searchString)
                .then(res => {
                    setFindedProducts(res.data);
                })
                .catch(err => {
                    dispatch(addError({
                        code: err.response.data.statusCode || "500",
                        message: err.response.data.message || "Произошла ошибка в приложении",
                        path: err.response.data.path || ""
                    }))
                })
        } else {
            setFindedProducts([])
        }
    }, [searchString])

    return (
        <div className="search-page-container">
            <div className="search-page-header">
                <div className="inner-container search-page-header-inner">
                    <div className="search-page-header-navigation">
                        Главная / <span>Поиск</span>
                    </div>
                    <div className="search-page-header-title">Поиск</div>
                    <div className="search-page-header-input field">
                        <input type="text" placeholder="Введите ваш запрос для поиска" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                        <div className="line" />
                    </div>
                </div>
            </div>
            <div className="inner-container search-page-result">
                {
                    searchString ? <div className="search-page-result-title">Результаты поиска:</div> : <div className="search-page-result-title">Начните искать здесь </div>
                }
                <div className="search-page-result-products">
                    {findedProducts.map(product => <ProductCard product={product} />)}
                </div>
            </div>
        </div>
    )
}

export default SearchPage;
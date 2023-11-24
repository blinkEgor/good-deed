export default function Page() {
    return (
        <div>
            <div>
                <div className="flex justify-between items-start md:w-2/3 sm:w-auto">
                    <h1 className="bg-green-600 p-4 mb-4 rounded-s-lg w-full">Мой список добрых дел</h1>
                    <input
                        className="border-none p-4 bg-green-500"
                    />
                    <button
                        className="text-4xl bg-green-600 p-2 px-4 rounded-e-lg"
                    >+</button>
                </div>
                <ul className="md:w-2/3 sm:w-auto">
                    <li className=" my-2 rounded-lg flex justify-between items-start">
                        <span className="bg-green-400 p-3 w-full rounded-s-lg">
                            Выгулил собаку
                        </span>
                        <button
                            className="bg-green-400 p-1.5 px-3 text-3xl rounded-e-lg"
                        >-</button>
                    </li>
                    <li className=" my-2 rounded-lg flex justify-between items-start">
                        <span className="bg-green-400 p-3 w-full rounded-s-lg">
                            Помог бабушке перейти дорогу
                        </span>
                        <button
                            className="bg-green-400 p-1.5 px-3 text-3xl rounded-e-lg"
                        >-</button>
                    </li>
                    <li className=" my-2 rounded-lg flex justify-between items-start">
                        <span className="bg-green-400 p-3 w-full rounded-s-lg">
                            Помог подруге найти серёжку
                        </span>
                        <button
                            className="bg-green-400 p-1.5 px-3 text-3xl rounded-e-lg"
                        >-</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
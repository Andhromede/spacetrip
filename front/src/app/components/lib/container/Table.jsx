import React from 'react';

const Table = ({ data: { column, rows } }) => {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <THeader column={column} />
                            <TBody rows={rows} />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;

const THeader = ({ column }) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {column.map((data, index) => (
                    <Th data={data} key={index} />
                ))}
            </tr>
        </thead>
    );
};

const Th = ({ data }) => {
    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
        >
            {data.name}
        </th>
    );
};

const TBody = ({ rows }) => {
    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row, index) => (
                <TRow row={row} key={index} />
            ))}
        </tbody>
    );
};

const TRow = ({ row }) => {
    return (
        <tr>
            {Object.keys(row).map((data, index) => (
                <Td data={row[data]} key={index} />
            ))}
        </tr>
    );
};

const Td = ({ data }) => {
    return <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{data}</td>;
};

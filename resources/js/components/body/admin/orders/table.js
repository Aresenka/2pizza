import React, {useMemo, useState} from 'react'
import {useTable} from 'react-table'

export default props => {
    const data = props.items

    const columns = useMemo(
        () => [
            {
                Header: 'Customer',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name'
                    },
                    {
                        Header: 'Phone',
                        accessor: 'phone'
                    },
                    {
                        Header: 'Address',
                        accessor: 'address'
                    }
                ]
            },
            {
                Header: 'Order details',
                columns: [
                    {
                        Header: 'Items',
                        Cell: table => {
                            const items = table.cell.row.original.items
                            return (
                                <div>
                                    {items.map((item, i) => {
                                        return <p key={`item_${i}`}>{item.count} x {item.title}</p>
                                    })}
                                </div>
                            )
                        }
                    },
                    {
                        Header: 'Total',
                        accessor: 'total'
                    },
                    {
                        Header: 'Status',
                        Cell: table => {
                            const row = table.cell.row.original
                            const [value, setValue] = useState(row.status)

                            function handleValueChange(e) {
                                handleChange(e)
                                setValue(e.target.value)
                            }

                            return (
                                <select
                                    id={`status_${row.id}`}
                                    className='order-select form-control'
                                    data-id={row.id}
                                    value={value || row.status}
                                    onChange={handleValueChange}
                                >
                                    <option
                                        key={`status_${row.id}_new`}
                                        value='new'
                                    >
                                        New
                                    </option>
                                    <option
                                        key={`status_${row.id}_in_progress`}
                                        value='in_progress'
                                    >
                                        In progress
                                    </option>
                                    <option
                                        key={`status_${row.id}_complete`}
                                        value='complete'
                                    >
                                        Complete
                                    </option>
                                    <option
                                        key={`status_${row.id}_error`}
                                        value='error'
                                    >
                                        Error
                                    </option>
                                </select>
                            )
                        }
                    },
                    {
                        Header: 'Created at',
                        accessor: 'created'
                    },
                    {
                        Header: 'Updated at',
                        accessor: 'updated'
                    },
                    {
                        Header: 'Comment',
                        Cell: table => (
                            <input
                                id={`comment_${table.cell.row.original.id}`}
                                type='text'
                                value={data.comment}
                                data-id={table.cell.row.original.id}
                                onChange={handleChange}
                            />
                        )
                    },
                    {
                        Header: 'Save changes',
                        Cell: table => (
                            <button
                                id={`save_${table.cell.row.original.id}`}
                                className='btn btn-secondary'
                                data-id={table.cell.row.original.id}
                                onClick={() => {
                                    handleClick(table.cell.row.original.id)
                                }}
                            >
                                <ion-icon name="save-outline"/>
                            </button>
                        )
                    }
                ]
            },
        ],
        []
    )

    const tableInstance = useTable({columns, data})

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    function toggleDisabled(disabled = true) {
        return disabled
    }

    function handleChange(e) {
        const id = e.target.dataset.id,
            button = document.getElementById(`save_${id}`)

        button.classList.remove('btn-secondary')
        button.classList.add('btn-success')
    }

    function handleClick(id) {
        const status = document.getElementById(`status_${id}`).value,
            comment = document.getElementById(`comment_${id}`).value,
            button = document.getElementById(`save_${id}`)


        button.classList.add('btn-secondary')
        button.classList.remove('btn-success')
        props.updateOrder({
            id: id,
            status: status,
            comment: comment
        })
    }

    return (
        <table
            className='table'
            {...getTableProps()}
        >
            <thead>
            {// Loop over the header rows
                headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                            headerGroup.headers.map(column => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps()}>
                                    {// Render the header
                                        column.render('Header')}
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
                rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                            {// Loop over the rows cells
                                row.cells.map(cell => {
                                    // Apply the cell props
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {// Render the cell contents
                                                cell.render('Cell')
                                            }
                                        </td>
                                    )
                                })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

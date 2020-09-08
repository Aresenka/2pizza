import React, {useMemo, useState} from 'react'
import {useTable} from 'react-table'

export default props => {
    //Get orders from props
    const {data} = props

    //Init columns (memoized)
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

                            //Return all ordered items with it's count
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

                            //Handle value change
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
                        Header: 'Created',
                        accessor: 'created'
                    },
                    {
                        Header: 'Updated',
                        accessor: 'updated'
                    },
                    {
                        Header: 'Comment',
                        Cell: table => (
                            <input
                                id={`comment_${table.cell.row.original.id}`}
                                type='text'
                                value={table.cell.row.original.comment ?? ''}
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

    //Init table instance
    const tableInstance = useTable({columns, data})

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    //Handle change of both select and comment input
    function handleChange(e) {
        const id = e.target.dataset.id,
            button = document.getElementById(`save_${id}`)

        //Here should be toggle of disabled attribute but onClick event doesn't work after removing disable from button
        button.classList.remove('btn-secondary')
        button.classList.add('btn-success')
    }

    //Update order after click to save button
    function handleClick(id) {
        const status = document.getElementById(`status_${id}`).value,
            comment = document.getElementById(`comment_${id}`).value,
            button = document.getElementById(`save_${id}`)

        //Here should be toggle of disabled attribute but onClick event doesn't work after removing disable from button
        button.classList.add('btn-secondary')
        button.classList.remove('btn-success')

        //Update order's both status and comment
        props.updateOrder({
            id: id,
            status: status,
            comment: comment
        })
    }

    return (
        //If it is no orders return placeholder
        data.length === 0 ?
            <div>
                Nothing ordered yet!
            </div> :
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

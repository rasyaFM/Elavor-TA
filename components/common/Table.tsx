import { Pencil, Trash } from "lucide-react";
import React from "react";

const Table = (props: TProps) => {
  const { datas, column, keys, next, prev, onDelete, onEdit } = props;
  return (
    <>
      <table className="table table-md border-2">
        <thead>
          <tr className="border-b-2">
            {column.map((data, index) => (
              <th className="border" key={data.header}>
                {data.header}
              </th>
            ))}
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((value: any) => {
            return (
              <tr key={value[keys]}>
                {column.map((data, index) => (
                  <td className="px-4 border" key={index}>
                    {(data.bodyTemplate && data.bodyTemplate(value)) ||
                      value[data.field]}
                  </td>
                ))}
                <td className="border max-w-[50px]">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit && onEdit(value)}
                      className="btn btn-outline btn-circle btn-warning h-8 min-h-8 w-8"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(value)}
                      className="btn btn-outline btn-circle btn-error h-8 min-h-8 w-8"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.onPage && (
        <div>
          {next && (
            <button
              className="mr-2"
              onClick={() => props.onPage && props.onPage(1)}
            >
              Next
            </button>
          )}

          {prev && (
            <button
              className="mr-2"
              onClick={() => props.onPage && props.onPage(0)}
            >
              Prev
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Table;

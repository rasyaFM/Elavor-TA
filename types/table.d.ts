interface TProps {
  column: TColumn[];
  datas: any;
  keys: string;
  onPage?: (datas) => void;
  next?: boolean;
  prev?: boolean;
  loading?: boolean;
  onDelete?: (datas) => void;
  onEdit?: (datas) => void;
}

interface TColumn {
  bodyTemplate?: (datas) => string;
  header: string;
  field: string;
  style?: string;
}

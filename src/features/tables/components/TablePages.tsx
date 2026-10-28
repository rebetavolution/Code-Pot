import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Filter,
  MoreVertical,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { DemoPage } from "../../../shared/components/layout/DemoPage";

const productTiles = [
  "from-slate-600 to-slate-800",
  "from-orange-500 to-rose-600",
  "from-sky-500 to-blue-700",
  "from-violet-500 to-indigo-700",
  "from-emerald-500 to-teal-700",
];

const recentOrders = [
  { id: 1, name: "Macbook pro 13”", variants: "2 Variants", category: "Laptop", price: "$2399.00", status: "Delivered" },
  { id: 2, name: "Apple Watch Ultra", variants: "1 Variant", category: "Watch", price: "$879.00", status: "Pending" },
  { id: 3, name: "iPhone 15 Pro Max", variants: "2 Variants", category: "SmartPhone", price: "$1869.00", status: "Delivered" },
  { id: 4, name: "iPad Pro 3rd Gen", variants: "2 Variants", category: "Electronics", price: "$1699.00", status: "Canceled" },
  { id: 5, name: "Airpods Pro 2nd Gen", variants: "1 Variant", category: "Accessories", price: "$240.00", status: "Delivered" },
];

const topProducts = [
  { id: 1, name: "TailGrids", category: "UI Kit", country: "US", countryTone: "from-blue-600 to-red-600", conversion: "Dashboard", value: "$12,499" },
  { id: 2, name: "GrayGrids", category: "UI Kit", country: "DE", countryTone: "from-zinc-700 to-amber-500", conversion: "Dashboard", value: "$10,800" },
  { id: 3, name: "LineIcons", category: "Icons", country: "FR", countryTone: "from-blue-700 to-red-500", conversion: "Landing", value: "$7,200" },
  { id: 4, name: "ThirdGear", category: "Templates", country: "GB", countryTone: "from-blue-800 to-red-600", conversion: "Dashboard", value: "$9,450" },
  { id: 5, name: "NextAdmin", category: "Templates", country: "JP", countryTone: "from-red-600 to-rose-400", conversion: "Landing", value: "$6,300" },
];

interface Campaign {
  id: number;
  creator: string;
  title: string;
  type: string;
  status: "Success" | "Pending" | "Failed";
}

const campaignSeed: Campaign[] = [
  { id: 1, creator: "Wilson Gouse", title: "Create a new campaign", type: "Ads campaign", status: "Success" },
  { id: 2, creator: "Terry Franci", title: "Make Better Ideas...", type: "Ads campaign", status: "Pending" },
  { id: 3, creator: "Alena Franci", title: "Increase your website tra...", type: "Ads campaign", status: "Success" },
  { id: 4, creator: "Jocelyn Kenter", title: "Digital Marketing that...", type: "Ads campaign", status: "Failed" },
  { id: 5, creator: "Brandon Philips", title: "Building the brand...", type: "Ads campaign", status: "Success" },
];

const orderBadge: Record<string, string> = {
  Delivered: "bg-green-500/15 text-green-400",
  Pending: "bg-yellow-500/15 text-yellow-400",
  Canceled: "bg-red-500/15 text-red-400",
};

const campaignBadge: Record<string, string> = {
  Success: "bg-green-500/15 text-green-400",
  Pending: "bg-yellow-500/15 text-yellow-400",
  Failed: "bg-red-500/15 text-red-400",
};

const tableActionButton =
  "inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-app-hover hover:text-text-primary";

const statusStyle: Record<string, string> = {
  Active: "bg-green-500/15 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Inactive: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function BasicTablesPage() {
  const [menu, setMenu] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [menu]);

  return (
    <DemoPage title="Basic Tables" description="Recent orders, product performance and campaign tables.">
      <TableCard title="Basic Table 1">
        <div className="overflow-hidden rounded-2xl border border-app-border bg-app-bg/40 px-4 pb-3 pt-4 sm:px-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
            <div className="flex items-center gap-3">
              <button className={tableActionButton}>
                <Filter size={18} /> Filter
              </button>
              <button className={tableActionButton}>See all</button>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-y border-app-border">
                <tr>
                  {["Products", "Category", "Price", "Status"].map((heading) => (
                    <th key={heading} className="whitespace-nowrap px-6 py-3 text-left first:pl-0">
                      <p className="text-xs font-medium text-text-muted">{heading}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-3 first:pl-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${
                            productTiles[order.id % productTiles.length]
                          } text-xs font-semibold text-white`}
                        >
                          {initials(order.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{order.name}</p>
                          <p className="text-xs text-text-muted">{order.variants}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{order.category}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{order.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          orderBadge[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TableCard>

      <TableCard title="Basic Table 2">
        <div className="overflow-hidden rounded-2xl border border-app-border bg-app-bg/40 px-4 pb-3 pt-4 sm:px-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
            <div className="flex items-center gap-3">
              <button className={tableActionButton}>
                <Filter size={18} /> Filter
              </button>
              <button className={tableActionButton}>See all</button>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-t border-app-border">
                  {["Products", "Category", "Country", "CR", "Value"].map((heading) => (
                    <th key={heading} className="px-6 py-3 text-left">
                      <p className="text-xs font-medium text-text-muted">{heading}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-t border-app-border">
                    <td className="px-6 py-3.5">
                      <p className="text-sm font-medium text-text-primary">{product.name}</p>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-text-secondary">{product.category}</td>
                    <td className="px-6 py-3.5">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${product.countryTone} text-[8px] font-semibold text-white`}
                      >
                        {product.country}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-text-secondary">{product.conversion}</td>
                    <td className="px-6 py-3.5 text-sm text-green-400">{product.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TableCard>

      <TableCard title="Basic Table 3">
        <div className="overflow-hidden rounded-2xl border border-app-border bg-app-bg/40 px-5 pb-3 pt-4 sm:px-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-text-primary">Featured Campaigns</h3>
            <button
              onClick={(event) => {
                event.stopPropagation();
                if (menu) {
                  setMenu(null);
                  return;
                }
                const rect = event.currentTarget.getBoundingClientRect();
                setMenu({ top: rect.bottom + 4, left: Math.max(8, rect.right - 160) });
              }}
              className="text-text-muted transition-colors hover:text-text-primary"
              aria-label="Campaign actions"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-app-border">
                  {["Creator", "Campaign", "Status"].map((heading) => (
                    <th key={heading} className="py-3 text-left font-normal">
                      <p className="text-sm text-text-muted">{heading}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {campaignSeed.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="py-3">
                      <div className="flex items-center gap-[18px]">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
                            avatarGradients[campaign.id % avatarGradients.length]
                          } text-xs font-medium text-white`}
                        >
                          {initials(campaign.creator)}
                        </div>
                        <p className="text-sm text-text-secondary">{campaign.creator}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex w-full items-center gap-5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${
                            productTiles[campaign.id % productTiles.length]
                          } text-[9px] font-semibold text-white`}
                        >
                          {campaign.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="truncate">
                          <p className="mb-0.5 truncate text-sm font-medium text-text-secondary">{campaign.title}</p>
                          <span className="text-xs text-text-muted">{campaign.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          campaignBadge[campaign.status]
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TableCard>

      {menu && (
        <div
          style={{ top: menu.top, left: menu.left }}
          onClick={(event) => event.stopPropagation()}
          className="fixed z-50 w-40 space-y-1 rounded-xl border border-app-border bg-app-surface p-2 shadow-lg"
        >
          <button
            onClick={() => setMenu(null)}
            className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-text-muted hover:bg-app-hover hover:text-text-primary"
          >
            View More
          </button>
          <button
            onClick={() => setMenu(null)}
            className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-text-muted hover:bg-app-hover hover:text-text-primary"
          >
            Delete
          </button>
        </div>
      )}
    </DemoPage>
  );
}

type PersonStatus = "Active" | "Pending" | "Inactive";

interface Person {
  id: number;
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;
  status: PersonStatus;
}

const peopleSeed: [string, string, string, number, string, string, PersonStatus][] = [
  ["Lindsey Curtis", "Accountant", "San Francisco", 34, "12 Feb, 2024", "$55,500", "Active"],
  ["Karen Chavez", "Sales Assistant", "New York", 28, "03 Mar, 2024", "$42,000", "Pending"],
  ["Andrew Johnston", "Accountant", "London", 45, "19 Apr, 2024", "$68,000", "Active"],
  ["Mariah Rivas", "Sales Assistant", "Tokyo", 31, "27 May, 2024", "$38,500", "Inactive"],
  ["Duane Hart", "Developer", "Edinburgh", 29, "08 Jun, 2024", "$74,200", "Active"],
  ["Alena Franci", "Designer", "San Francisco", 26, "16 Jul, 2024", "$61,000", "Active"],
  ["Jocelyn Kenter", "Product Manager", "New York", 38, "21 Aug, 2024", "$92,400", "Pending"],
  ["Brandon Philips", "Marketing", "London", 33, "04 Sep, 2024", "$57,800", "Active"],
  ["Terry Franci", "Support Engineer", "Tokyo", 30, "12 Oct, 2024", "$48,300", "Inactive"],
  ["Musharof Chowdhury", "Team Manager", "San Francisco", 41, "25 Oct, 2024", "$104,500", "Active"],
  ["Courtney Henry", "QA Analyst", "Edinburgh", 27, "07 Nov, 2024", "$46,900", "Active"],
  ["Darlene Robertson", "Data Analyst", "New York", 35, "18 Nov, 2024", "$66,200", "Pending"],
  ["Cameron Williamson", "Sales Assistant", "London", 24, "02 Dec, 2024", "$36,400", "Active"],
  ["Esther Howard", "Accountant", "Tokyo", 44, "15 Dec, 2024", "$71,800", "Inactive"],
  ["Guy Hawkins", "Developer", "San Francisco", 32, "09 Jan, 2025", "$88,000", "Active"],
  ["Jenny Wilson", "Designer", "New York", 29, "22 Jan, 2025", "$63,500", "Active"],
  ["Robert Fox", "Marketing", "Edinburgh", 37, "06 Feb, 2025", "$59,700", "Pending"],
  ["Kristin Watson", "Product Manager", "London", 40, "19 Feb, 2025", "$96,300", "Active"],
  ["Cody Fisher", "Support Engineer", "Tokyo", 26, "04 Mar, 2025", "$44,100", "Inactive"],
  ["Savannah Nguyen", "QA Analyst", "San Francisco", 31, "17 Mar, 2025", "$52,600", "Active"],
  ["Jacob Jones", "Data Analyst", "New York", 34, "29 Mar, 2025", "$69,400", "Active"],
  ["Arlene McCoy", "Sales Assistant", "London", 23, "11 Apr, 2025", "$35,200", "Pending"],
  ["Devon Lane", "Accountant", "Edinburgh", 46, "24 Apr, 2025", "$77,900", "Active"],
  ["Ralph Edwards", "Developer", "Tokyo", 30, "08 May, 2025", "$84,600", "Inactive"],
  ["Kathryn Murphy", "Designer", "San Francisco", 27, "21 May, 2025", "$60,800", "Active"],
  ["Jerome Bell", "Marketing", "New York", 39, "03 Jun, 2025", "$64,200", "Active"],
];

const allPeople: Person[] = peopleSeed.map(
  ([name, position, office, age, startDate, salary, status], index) => ({
    id: index + 1,
    name,
    position,
    office,
    age,
    startDate,
    salary,
    status,
  }),
);

type ColumnKey = "user" | "position" | "office" | "age" | "startDate" | "salary" | "status" | "action";

interface Column {
  key: ColumnKey;
  label: string;
  span: string;
  sortable?: boolean;
}

const baseColumns: Column[] = [
  { key: "user", label: "User", span: "col-span-3" },
  { key: "position", label: "Position", span: "col-span-2" },
  { key: "office", label: "Office", span: "col-span-2" },
  { key: "age", label: "Age", span: "col-span-1" },
  { key: "startDate", label: "Start date", span: "col-span-2" },
];

const columnsOne: Column[] = [...baseColumns, { key: "salary", label: "Salary", span: "col-span-2" }];

const columnsTwo: Column[] = [
  { key: "user", label: "User", span: "col-span-3" },
  { key: "position", label: "Position", span: "col-span-2" },
  { key: "office", label: "Office", span: "col-span-2" },
  { key: "age", label: "Age", span: "col-span-1" },
  { key: "startDate", label: "Start date", span: "col-span-2" },
  { key: "salary", label: "Salary", span: "col-span-1" },
  { key: "action", label: "Action", span: "col-span-1", sortable: false },
];

const columnsThree: Column[] = [
  { key: "user", label: "User", span: "col-span-3" },
  { key: "position", label: "Position", span: "col-span-2" },
  { key: "salary", label: "Salary", span: "col-span-2" },
  { key: "office", label: "Office", span: "col-span-2" },
  { key: "status", label: "Status", span: "col-span-2", sortable: false },
  { key: "action", label: "Action", span: "col-span-1", sortable: false },
];

const avatarGradients = [
  "from-indigo-500 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
  "from-sky-500 to-blue-600",
  "from-pink-500 to-fuchsia-600",
  "from-amber-500 to-orange-600",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const salaryValue = (salary: string) => Number(salary.replace(/[^0-9.]/g, ""));

function comparePeople(a: Person, b: Person, key: ColumnKey) {
  switch (key) {
    case "user":
      return a.name.localeCompare(b.name);
    case "position":
      return a.position.localeCompare(b.position);
    case "office":
      return a.office.localeCompare(b.office);
    case "age":
      return a.age - b.age;
    case "startDate":
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    case "salary":
      return salaryValue(a.salary) - salaryValue(b.salary);
    default:
      return 0;
  }
}

function pageList(current: number, total: number): (number | "start-gap" | "end-gap")[] {
  if (total <= 1) return [1];
  const items: (number | "start-gap" | "end-gap")[] = [1];
  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);
  if (start > 2) items.push("start-gap");
  for (let page = start; page <= end; page++) items.push(page);
  if (end < total - 1) items.push("end-gap");
  items.push(total);
  return items;
}

interface DataTableProps {
  people: Person[];
  columns: Column[];
  downloadable?: boolean;
}

function DataTable({ people: initialPeople, columns, downloadable = false }: DataTableProps) {
  const [rows, setRows] = useState<Person[]>(initialPeople);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: ColumnKey; dir: "asc" | "desc" }>({ key: "user", dir: "asc" });
  const [menu, setMenu] = useState<{ id: number; top: number; left: number } | null>(null);

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [menu]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matched = query
      ? rows.filter((person) =>
          [person.name, person.position, person.office, person.status].some((value) =>
            value.toLowerCase().includes(query),
          ),
        )
      : rows;
    return [...matched].sort((a, b) =>
      sort.dir === "asc" ? comparePeople(a, b, sort.key) : comparePeople(b, a, sort.key),
    );
  }, [rows, search, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  const toggleSort = (key: ColumnKey) =>
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" },
    );

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((person) => person.id !== id));
    setMenu(null);
  };

  const renderCell = (person: Person, key: ColumnKey) => {
    if (key === "user") {
      return (
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
              avatarGradients[person.id % avatarGradients.length]
            } text-xs font-medium text-white`}
          >
            {initials(person.name)}
          </div>
          <span className="text-sm font-medium text-text-primary">{person.name}</span>
        </div>
      );
    }

    if (key === "status") {
      return (
        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs ${statusStyle[person.status]}`}>
          {person.status}
        </span>
      );
    }

    if (key === "action") {
      return (
        <div className="relative">
          <button
            onClick={(event) => {
              event.stopPropagation();
              if (menu?.id === person.id) {
                setMenu(null);
                return;
              }
              const rect = event.currentTarget.getBoundingClientRect();
              setMenu({ id: person.id, top: rect.bottom + 4, left: Math.max(8, rect.right - 144) });
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary"
            aria-label={`Actions for ${person.name}`}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      );
    }

    const value = key === "salary" ? person.salary : key === "age" ? person.age : person[key];
    return <p className="text-sm text-text-secondary">{value}</p>;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-app-border bg-app-bg/40 pt-4">
      <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <span>Show</span>
          <div className="relative">
            <select
              value={perPage}
              onChange={(event) => {
                setPerPage(Number(event.target.value));
                setPage(1);
              }}
              className="h-9 w-20 appearance-none rounded-lg border border-app-border bg-app-bg py-2 pl-3 pr-8 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {[10, 8, 5].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
          <span>entries</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="h-11 w-full rounded-lg border border-app-border bg-app-bg py-2.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent xl:w-[300px]"
            />
          </div>
          {downloadable && (
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-opacity hover:opacity-90">
              <Download size={16} /> Download
            </button>
          )}
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <div className="grid grid-cols-12 border-t border-app-border">
            {columns.map((column, index) => (
              <div
                key={column.key}
                className={`${column.span} flex items-center px-4 py-3 ${
                  index < columns.length - 1 ? "border-r border-app-border" : ""
                }`}
              >
                {column.sortable === false ? (
                  <p className="text-xs font-medium text-text-muted">{column.label}</p>
                ) : (
                  <button
                    onClick={() => toggleSort(column.key)}
                    className="flex w-full items-center justify-between gap-2 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                  >
                    {column.label}
                    <span className="flex flex-col gap-0.5">
                      <ChevronUp
                        size={9}
                        className={
                          sort.key === column.key && sort.dir === "asc" ? "text-accent-light" : "text-text-dim/50"
                        }
                      />
                      <ChevronDown
                        size={9}
                        className={
                          sort.key === column.key && sort.dir === "desc" ? "text-accent-light" : "text-text-dim/50"
                        }
                      />
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {visible.map((person) => (
            <div
              key={person.id}
              className="grid grid-cols-12 border-t border-app-border transition-colors hover:bg-app-hover/40"
            >
              {columns.map((column, index) => (
                <div
                  key={column.key}
                  className={`${column.span} flex items-center px-4 py-3 ${
                    index < columns.length - 1 ? "border-r border-app-border" : ""
                  }`}
                >
                  {renderCell(person, column.key)}
                </div>
              ))}
            </div>
          ))}

          {visible.length === 0 && (
            <div className="border-t border-app-border py-10 text-center text-sm text-text-muted">
              No matching records found.
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-app-border py-4 pl-[18px] pr-4">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <p className="border-b border-app-border pb-3 text-center text-sm font-medium text-text-muted xl:border-b-0 xl:pb-0 xl:text-left">
            Showing {total === 0 ? 0 : start + 1} to {Math.min(start + perPage, total)} of {total} entries
          </p>

          <div className="flex items-center justify-center gap-0.5 pt-4 xl:justify-end xl:pt-0">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="mr-2.5 flex h-10 w-10 items-center justify-center rounded-lg border border-app-border bg-app-surface text-text-secondary transition-colors hover:bg-app-hover disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {pageList(currentPage, totalPages).map((item) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item
                      ? "bg-accent/10 text-accent-light"
                      : "text-text-secondary hover:bg-accent/10 hover:text-accent-light"
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={item}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-text-muted"
                >
                  ...
                </span>
              ),
            )}

            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-2.5 flex h-10 w-10 items-center justify-center rounded-lg border border-app-border bg-app-surface text-text-secondary transition-colors hover:bg-app-hover disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {menu && (
        <div
          style={{ top: menu.top, left: menu.left }}
          onClick={(event) => event.stopPropagation()}
          className="fixed z-50 w-36 overflow-hidden rounded-lg border border-app-border bg-app-surface shadow-lg"
        >
          <button
            onClick={() => setMenu(null)}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:bg-app-hover"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => removeRow(menu.id)}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

function TableCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-app-border bg-app-surface">
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <h3 className="text-base font-medium text-text-primary">{title}</h3>
      </div>
      <div className="border-t border-app-border p-5 sm:p-6">{children}</div>
    </div>
  );
}

export function DataTablesPage() {
  return (
    <DemoPage title="Data Tables" description="Searchable, sortable table variants with pagination.">
      <TableCard title="Datatable 1">
        <DataTable people={allPeople} columns={columnsOne} />
      </TableCard>

      <TableCard title="Datatable 2">
        <DataTable people={allPeople} columns={columnsTwo} />
      </TableCard>

      <TableCard title="Datatable 3">
        <DataTable people={allPeople} columns={columnsThree} downloadable />
      </TableCard>
    </DemoPage>
  );
}

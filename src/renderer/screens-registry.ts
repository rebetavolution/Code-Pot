import type { LucideIcon } from "lucide-react";
import {
  Home,
  Folder,
  Sparkles,
  Settings,
  User,
  Calendar,
  LayoutGrid,
  BellRing,
  CircleUser,
  Tag,
  ChevronsRight,
  MousePointerClick,
  Layers,
  CreditCard,
  GalleryHorizontal,
  ChevronDown,
  Image,
  Link,
  List,
  Maximize2,
  Bell,
  MoreHorizontal,
  MessageSquare,
  Gauge,
  Award,
  Loader,
  LayoutList,
  MessageCircle,
  Video,
  FolderOpen,
  BadgeDollarSign,
  HelpCircle,
  KeyRound,
  Puzzle,
  FileText,
  FileQuestion,
  ServerCrash,
  ServerOff,
  Clock,
  Wrench,
  CheckCircle2,
  Files,
  LayoutDashboard,
  Bot,
  ShoppingCart,
  ListTodo,
  TextCursorInput,
  Table2,
  PanelsTopLeft,
  Headset,
  LineChart,
  Map,
  ShieldCheck,
} from "lucide-react";
import { HomeScreen } from "../features/home/components/HomeScreen";
import { ExplorerScreen } from "../features/explorer/components/ExplorerScreen";
import { AiScreen } from "../features/ai/components/AiScreen";
import { ProfileScreen } from "../features/profile/components/ProfileScreen";
import { CalendarScreen } from "../features/calendar/components/CalendarScreen";
import { SettingsScreen } from "../features/settings/components/SettingsScreen";
import {
  AlertsPage,
  AvatarsPage,
  BadgePage,
  BreadcrumbPage,
  ButtonsPage,
  ButtonsGroupPage,
  CardsPage,
  CarouselPage,
  DropdownsPage,
  ImagesPage,
  LinksPage,
  ListPage,
  ModalsPage,
  NotificationsPage,
  PaginationPage,
  PopoversPage,
  ProgressBarsPage,
  RibbonsPage,
  SpinnersPage,
  TabsPage,
  TooltipsPage,
  VideosPage,
} from "../features/ui-elements/components";
import {
  FileManagerPage,
  PricingTablesPage,
  FaqPage,
  ApiKeysPage,
  IntegrationsPage,
  BlankPage,
  Error404Page,
  Error500Page,
  Error503Page,
  ComingSoonPage,
  MaintenancePage,
  SuccessPage,
} from "../features/pages/components";
import {
  EcommerceDashboardPage,
  AnalyticsDashboardPage,
  MarketingDashboardPage,
  CrmDashboardPage,
  StocksDashboardPage,
  SaasDashboardPage,
  LogisticsDashboardPage,
  AiDashboardPage,
  SalesDashboardPage,
  FinanceDashboardPage,
} from "../features/dashboards/components";
import {
  TextGeneratorPage,
  ImageGeneratorPage,
  CodeGeneratorPage,
  VideoGeneratorPage,
  AiSettingsPage,
} from "../features/ai-assistant/components";
import {
  ProductsPage,
  AddProductPage,
  BillingPage,
  InvoicesPage,
  SingleInvoicePage,
  CreateInvoicePage,
  TransactionsPage,
  SingleTransactionPage,
} from "../features/ecommerce/components";
import { TaskListPage, KanbanPage } from "../features/task/components";
import { FormElementsPage, FormLayoutPage } from "../features/forms/components";
import { BasicTablesPage, DataTablesPage } from "../features/tables/components";
import {
  LayoutOnePage,
  LayoutTwoPage,
  LayoutThreePage,
  LayoutFourPage,
  LayoutFivePage,
  LayoutSixPage,
} from "../features/layouts/components";
import {
  ChatPage,
  TicketListPage,
  TicketReplyPage,
  EmailInboxPage,
  EmailDetailPage,
} from "../features/support/components";
import {
  LineChartPage,
  BarChartPage,
  PieChartPage,
  RadarChartPage,
  RadialChartPage,
} from "../features/charts/components";
import { MapPage, VectorMapPage } from "../features/maps/components";
import {
  SignInPage,
  SignUpPage,
  ResetPasswordPage,
  TwoStepVerificationPage,
} from "../features/authentication/components";

export type ScreenSection = "main" | "bottom";

export interface ScreenDef {
  id: string;
  label: string;
  icon: LucideIcon;
  section: ScreenSection;
  component: React.ComponentType;
  group?: string;
}

export const DASHBOARDS_GROUP = "Dashboards";
export const AI_ASSISTANT_GROUP = "AI Assistant";
export const ECOMMERCE_GROUP = "E-commerce";
export const TASK_GROUP = "Task";
export const FORMS_GROUP = "Forms";
export const TABLES_GROUP = "Tables";
export const UI_ELEMENTS_GROUP = "UI Elements";
export const PAGES_GROUP = "Pages";
export const LAYOUTS_GROUP = "Layouts";
export const SUPPORT_GROUP = "Support";
export const CHARTS_GROUP = "Charts";
export const MAPS_GROUP = "Maps";
export const AUTH_GROUP = "Authentication";

export const screens: readonly ScreenDef[] = [
  { id: "home", label: "Home", icon: Home, section: "main", component: HomeScreen },
  { id: "explorer", label: "Explorer", icon: Folder, section: "main", component: ExplorerScreen },
  { id: "ai", label: "AI", icon: Sparkles, section: "main", component: AiScreen },

  // Dashboards
  { id: "dash-ecommerce", label: "eCommerce", icon: ShoppingCart, section: "main", group: DASHBOARDS_GROUP, component: EcommerceDashboardPage },
  { id: "dash-analytics", label: "Analytics", icon: LineChart, section: "main", group: DASHBOARDS_GROUP, component: AnalyticsDashboardPage },
  { id: "dash-marketing", label: "Marketing", icon: Sparkles, section: "main", group: DASHBOARDS_GROUP, component: MarketingDashboardPage },
  { id: "dash-crm", label: "CRM", icon: CircleUser, section: "main", group: DASHBOARDS_GROUP, component: CrmDashboardPage },
  { id: "dash-stocks", label: "Stocks", icon: BadgeDollarSign, section: "main", group: DASHBOARDS_GROUP, component: StocksDashboardPage },
  { id: "dash-saas", label: "SaaS", icon: Layers, section: "main", group: DASHBOARDS_GROUP, component: SaasDashboardPage },
  { id: "dash-logistics", label: "Logistics", icon: FolderOpen, section: "main", group: DASHBOARDS_GROUP, component: LogisticsDashboardPage },
  { id: "dash-ai", label: "AI Dashboard", icon: Bot, section: "main", group: DASHBOARDS_GROUP, component: AiDashboardPage },
  { id: "dash-sales", label: "Sales", icon: Gauge, section: "main", group: DASHBOARDS_GROUP, component: SalesDashboardPage },
  { id: "dash-finance", label: "Finance", icon: CreditCard, section: "main", group: DASHBOARDS_GROUP, component: FinanceDashboardPage },

  // AI Assistant
  { id: "ai-text", label: "Text Generator", icon: FileText, section: "main", group: AI_ASSISTANT_GROUP, component: TextGeneratorPage },
  { id: "ai-image", label: "Image Generator", icon: Image, section: "main", group: AI_ASSISTANT_GROUP, component: ImageGeneratorPage },
  { id: "ai-code", label: "Code Generator", icon: KeyRound, section: "main", group: AI_ASSISTANT_GROUP, component: CodeGeneratorPage },
  { id: "ai-video", label: "Video Generator", icon: Video, section: "main", group: AI_ASSISTANT_GROUP, component: VideoGeneratorPage },
  { id: "ai-settings", label: "AI Settings", icon: Settings, section: "main", group: AI_ASSISTANT_GROUP, component: AiSettingsPage },

  // E-commerce
  { id: "shop-products", label: "Products", icon: ShoppingCart, section: "main", group: ECOMMERCE_GROUP, component: ProductsPage },
  { id: "shop-add-product", label: "Add Product", icon: CreditCard, section: "main", group: ECOMMERCE_GROUP, component: AddProductPage },
  { id: "shop-billing", label: "Billing", icon: BadgeDollarSign, section: "main", group: ECOMMERCE_GROUP, component: BillingPage },
  { id: "shop-invoices", label: "Invoices", icon: FileText, section: "main", group: ECOMMERCE_GROUP, component: InvoicesPage },
  { id: "shop-invoice", label: "Single Invoice", icon: FileQuestion, section: "main", group: ECOMMERCE_GROUP, component: SingleInvoicePage },
  { id: "shop-create-invoice", label: "Create Invoice", icon: Files, section: "main", group: ECOMMERCE_GROUP, component: CreateInvoicePage },
  { id: "shop-transactions", label: "Transactions", icon: List, section: "main", group: ECOMMERCE_GROUP, component: TransactionsPage },
  { id: "shop-transaction", label: "Single Transaction", icon: ListTodo, section: "main", group: ECOMMERCE_GROUP, component: SingleTransactionPage },

  { id: "calendar", label: "Calendar", icon: Calendar, section: "main", component: CalendarScreen },
  { id: "profile", label: "Profile", icon: User, section: "main", component: ProfileScreen },

  // Task
  { id: "task-list", label: "List", icon: ListTodo, section: "main", group: TASK_GROUP, component: TaskListPage },
  { id: "task-kanban", label: "Kanban", icon: LayoutGrid, section: "main", group: TASK_GROUP, component: KanbanPage },

  // Forms
  { id: "form-elements", label: "Form Elements", icon: TextCursorInput, section: "main", group: FORMS_GROUP, component: FormElementsPage },
  { id: "form-layout", label: "Form Layout", icon: PanelsTopLeft, section: "main", group: FORMS_GROUP, component: FormLayoutPage },

  // Tables
  { id: "table-basic", label: "Basic Tables", icon: Table2, section: "main", group: TABLES_GROUP, component: BasicTablesPage },
  { id: "table-data", label: "Data Tables", icon: Table2, section: "main", group: TABLES_GROUP, component: DataTablesPage },

  // UI Elements
  { id: "ui-alerts", label: "Alerts", icon: BellRing, section: "main", group: UI_ELEMENTS_GROUP, component: AlertsPage },
  { id: "ui-avatars", label: "Avatars", icon: CircleUser, section: "main", group: UI_ELEMENTS_GROUP, component: AvatarsPage },
  { id: "ui-badge", label: "Badge", icon: Tag, section: "main", group: UI_ELEMENTS_GROUP, component: BadgePage },
  { id: "ui-breadcrumb", label: "Breadcrumb", icon: ChevronsRight, section: "main", group: UI_ELEMENTS_GROUP, component: BreadcrumbPage },
  { id: "ui-buttons", label: "Buttons", icon: MousePointerClick, section: "main", group: UI_ELEMENTS_GROUP, component: ButtonsPage },
  { id: "ui-buttons-group", label: "Buttons Group", icon: Layers, section: "main", group: UI_ELEMENTS_GROUP, component: ButtonsGroupPage },
  { id: "ui-cards", label: "Cards", icon: CreditCard, section: "main", group: UI_ELEMENTS_GROUP, component: CardsPage },
  { id: "ui-carousel", label: "Carousel", icon: GalleryHorizontal, section: "main", group: UI_ELEMENTS_GROUP, component: CarouselPage },
  { id: "ui-dropdowns", label: "Dropdowns", icon: ChevronDown, section: "main", group: UI_ELEMENTS_GROUP, component: DropdownsPage },
  { id: "ui-images", label: "Images", icon: Image, section: "main", group: UI_ELEMENTS_GROUP, component: ImagesPage },
  { id: "ui-links", label: "Links", icon: Link, section: "main", group: UI_ELEMENTS_GROUP, component: LinksPage },
  { id: "ui-list", label: "List", icon: List, section: "main", group: UI_ELEMENTS_GROUP, component: ListPage },
  { id: "ui-modals", label: "Modals", icon: Maximize2, section: "main", group: UI_ELEMENTS_GROUP, component: ModalsPage },
  { id: "ui-notifications", label: "Notifications", icon: Bell, section: "main", group: UI_ELEMENTS_GROUP, component: NotificationsPage },
  { id: "ui-pagination", label: "Pagination", icon: MoreHorizontal, section: "main", group: UI_ELEMENTS_GROUP, component: PaginationPage },
  { id: "ui-popovers", label: "Popovers", icon: MessageSquare, section: "main", group: UI_ELEMENTS_GROUP, component: PopoversPage },
  { id: "ui-progress", label: "Progress Bars", icon: Gauge, section: "main", group: UI_ELEMENTS_GROUP, component: ProgressBarsPage },
  { id: "ui-ribbons", label: "Ribbons", icon: Award, section: "main", group: UI_ELEMENTS_GROUP, component: RibbonsPage },
  { id: "ui-spinners", label: "Spinners", icon: Loader, section: "main", group: UI_ELEMENTS_GROUP, component: SpinnersPage },
  { id: "ui-tabs", label: "Tabs", icon: LayoutList, section: "main", group: UI_ELEMENTS_GROUP, component: TabsPage },
  { id: "ui-tooltips", label: "Tooltips", icon: MessageCircle, section: "main", group: UI_ELEMENTS_GROUP, component: TooltipsPage },
  { id: "ui-videos", label: "Videos", icon: Video, section: "main", group: UI_ELEMENTS_GROUP, component: VideosPage },

  // Pages
  { id: "page-file-manager", label: "File Manager", icon: FolderOpen, section: "main", group: PAGES_GROUP, component: FileManagerPage },
  { id: "page-pricing", label: "Pricing Tables", icon: BadgeDollarSign, section: "main", group: PAGES_GROUP, component: PricingTablesPage },
  { id: "page-faq", label: "FAQ", icon: HelpCircle, section: "main", group: PAGES_GROUP, component: FaqPage },
  { id: "page-api-keys", label: "API Keys", icon: KeyRound, section: "main", group: PAGES_GROUP, component: ApiKeysPage },
  { id: "page-integrations", label: "Integrations", icon: Puzzle, section: "main", group: PAGES_GROUP, component: IntegrationsPage },
  { id: "page-blank", label: "Blank Page", icon: FileText, section: "main", group: PAGES_GROUP, component: BlankPage },
  { id: "page-404", label: "404 Error", icon: FileQuestion, section: "main", group: PAGES_GROUP, component: Error404Page },
  { id: "page-500", label: "500 Error", icon: ServerCrash, section: "main", group: PAGES_GROUP, component: Error500Page },
  { id: "page-503", label: "503 Error", icon: ServerOff, section: "main", group: PAGES_GROUP, component: Error503Page },
  { id: "page-coming-soon", label: "Coming Soon", icon: Clock, section: "main", group: PAGES_GROUP, component: ComingSoonPage },
  { id: "page-maintenance", label: "Maintenance", icon: Wrench, section: "main", group: PAGES_GROUP, component: MaintenancePage },
  { id: "page-success", label: "Success", icon: CheckCircle2, section: "main", group: PAGES_GROUP, component: SuccessPage },

  // Layouts
  { id: "layout-1", label: "Layout One", icon: PanelsTopLeft, section: "main", group: LAYOUTS_GROUP, component: LayoutOnePage },
  { id: "layout-2", label: "Layout Two", icon: PanelsTopLeft, section: "main", group: LAYOUTS_GROUP, component: LayoutTwoPage },
  { id: "layout-3", label: "Layout Three", icon: PanelsTopLeft, section: "main", group: LAYOUTS_GROUP, component: LayoutThreePage },
  { id: "layout-4", label: "Layout Four", icon: PanelsTopLeft, section: "main", group: LAYOUTS_GROUP, component: LayoutFourPage },
  { id: "layout-5", label: "Layout Five", icon: PanelsTopLeft, section: "main", group: LAYOUTS_GROUP, component: LayoutFivePage },
  { id: "layout-6", label: "Layout Six", icon: PanelsTopLeft, section: "main", group: LAYOUTS_GROUP, component: LayoutSixPage },

  // Support
  { id: "support-chat", label: "Chat", icon: MessageCircle, section: "main", group: SUPPORT_GROUP, component: ChatPage },
  { id: "support-tickets", label: "Ticket List", icon: ListTodo, section: "main", group: SUPPORT_GROUP, component: TicketListPage },
  { id: "support-ticket-reply", label: "Ticket Reply", icon: MessageSquare, section: "main", group: SUPPORT_GROUP, component: TicketReplyPage },
  { id: "support-inbox", label: "Inbox", icon: Bell, section: "main", group: SUPPORT_GROUP, component: EmailInboxPage },
  { id: "support-email-detail", label: "Email Details", icon: FileText, section: "main", group: SUPPORT_GROUP, component: EmailDetailPage },

  // Charts
  { id: "chart-line", label: "Line Chart", icon: LineChart, section: "main", group: CHARTS_GROUP, component: LineChartPage },
  { id: "chart-bar", label: "Bar Chart", icon: LayoutList, section: "main", group: CHARTS_GROUP, component: BarChartPage },
  { id: "chart-pie", label: "Pie Chart", icon: Gauge, section: "main", group: CHARTS_GROUP, component: PieChartPage },
  { id: "chart-radar", label: "Radar Chart", icon: Award, section: "main", group: CHARTS_GROUP, component: RadarChartPage },
  { id: "chart-radial", label: "Radial Chart", icon: Loader, section: "main", group: CHARTS_GROUP, component: RadialChartPage },

  // Maps
  { id: "map-default", label: "Map", icon: Map, section: "main", group: MAPS_GROUP, component: MapPage },
  { id: "map-vector", label: "Vector Map", icon: Map, section: "main", group: MAPS_GROUP, component: VectorMapPage },

  // Authentication
  { id: "auth-signin", label: "Sign In", icon: ShieldCheck, section: "main", group: AUTH_GROUP, component: SignInPage },
  { id: "auth-signup", label: "Sign Up", icon: ShieldCheck, section: "main", group: AUTH_GROUP, component: SignUpPage },
  { id: "auth-reset", label: "Reset Password", icon: KeyRound, section: "main", group: AUTH_GROUP, component: ResetPasswordPage },
  { id: "auth-2fa", label: "Two Step Verification", icon: ShieldCheck, section: "main", group: AUTH_GROUP, component: TwoStepVerificationPage },

  { id: "settings", label: "Settings", icon: Settings, section: "bottom", component: SettingsScreen },
];

export const SCREEN_BY_ID: Record<string, ScreenDef> = screens.reduce(
  (acc, screen) => {
    acc[screen.id] = screen;
    return acc;
  },
  {} as Record<string, ScreenDef>,
);

/** Ordered group names with their items, used by the sidebar. */
export function getScreenGroups() {
  const order: string[] = [];
  const map: Record<string, ScreenDef[]> = {};
  for (const screen of screens) {
    if (!screen.group) continue;
    if (!map[screen.group]) {
      map[screen.group] = [];
      order.push(screen.group);
    }
    map[screen.group].push(screen);
  }
  return order.map((name) => ({ name, items: map[name] }));
}

export const GROUP_ICON: Record<string, LucideIcon> = {
  [DASHBOARDS_GROUP]: LayoutDashboard,
  [AI_ASSISTANT_GROUP]: Bot,
  [ECOMMERCE_GROUP]: ShoppingCart,
  [TASK_GROUP]: ListTodo,
  [FORMS_GROUP]: TextCursorInput,
  [TABLES_GROUP]: Table2,
  [UI_ELEMENTS_GROUP]: LayoutGrid,
  [PAGES_GROUP]: Files,
  [LAYOUTS_GROUP]: PanelsTopLeft,
  [SUPPORT_GROUP]: Headset,
  [CHARTS_GROUP]: LineChart,
  [MAPS_GROUP]: Map,
  [AUTH_GROUP]: ShieldCheck,
};

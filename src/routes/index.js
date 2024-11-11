import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  AboutPage,
  AbstractConferenceCreate,
  AbstractConferenceList,
  AbstractConfrenceDetails,
  AbstractJournalCreate
  // Dashboard: App
  ,


















  AbstractJournalDetails,



  AbstractjournalList,
  //
  BlankPage,
  // Dashboard: Blog
  BlogPostsPage,
  CalendarPage,
  // Dashboard: App
  ChatPage,
  ComingSoonPage,
  //
  ComponentsOverviewPage,
  ConferenceCreatePage,
  ConferenceDetails,
  ConferenceList
  // Auth
  ,
































































































  Contact,
  //
  DemoAnimatePage,
  DemoCarouselsPage,
  DemoChartsPage,
  DemoCopyToClipboardPage,
  DemoEditorPage,
  DemoFormValidationPage,
  DemoImagePage,
  DemoLabelPage,
  DemoLightboxPage,
  DemoMapPage,
  DemoMarkdownPage,
  DemoMegaMenuPage,
  DemoMultiLanguagePage,
  DemoNavigationBarPage,
  DemoOrganizationalChartPage,
  DemoScrollbarPage,
  DemoSnackbarPage,
  DemoTextMaxLinePage,
  DemoUploadPage,
  EcommerceCheckoutPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  EcommerceProductEditPage,
  EcommerceProductListPage,
  // Dashboard: Ecommerce
  EcommerceShopPage,
  EvaluationDetails,
  EvaluationList,
  FaqsPage,
  FeaturedJournals,
  // Dashboard: FileManager
  FileManagerPage,
  FoundationColorsPage,
  FoundationGridPage,
  FoundationIconsPage,
  FoundationShadowsPage,
  FoundationTypographyPage,
  GeneralAnalyticsPage,
  // Dashboard: General
  GeneralAppPage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralFilePage,
  HomePage,
  IjinCreatePage,
  IjinList,
  InvoiceCreatePage,
  InvoiceDetailsPage,
  InvoiceEditPage,
  // Dashboard: Invoice
  InvoiceListPage,
  KanbanPage,
  // Auth
  LoginPage,
  MailPage,
  MaintenancePage,
  MasterDetails
  //
  ,
































































































































































































































  MasterList
  // Auth
  ,
















































































































































































































































  //
  MUIAccordionPage,
  MUIAlertPage,
  MUIAutocompletePage,
  MUIAvatarPage,
  MUIBadgePage,
  MUIBreadcrumbsPage,
  MUIButtonsPage,
  MUICheckboxPage,
  MUIChipPage,
  MUIDataGridPage,
  MUIDialogPage,
  MUIListPage,
  MUIMenuPage,
  MUIPaginationPage,
  MUIPickersPage,
  MUIPopoverPage,
  MUIProgressPage,
  MUIRadioButtonsPage,
  MUIRatingPage,
  MUISliderPage,
  MUIStepperPage,
  MUISwitchPage,
  MUITablePage,
  MUITabsPage,
  MUITextFieldPage,
  MUITimelinePage,
  MUITooltipPage,
  MUITransferListPage,
  MUITreesViewPage,
  NewPasswordPage,
  Page403,
  Page404,
  //
  Page500,
  PaymentPage,
  PermissionDeniedPage,
  PricingPage,
  RegisterPage,
  ResetPasswordPage,
  SearchResultsPage,
  SelectionPage,
  ThesisCreatePage,
  ThesisDetails,
  ThesisListPage,
  UserAccountPage,
  UserCardsPage,
  UserCreatePage,
  UserEditPage,
  // Dashboard: User
  UserListPage,
  UserProfilePage,
  VerifyCodePage
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'ecommerce', element: <GeneralEcommercePage /> },
        { path: 'analytics', element: <GeneralAnalyticsPage /> },
        { path: 'banking', element: <GeneralBankingPage /> },
        { path: 'booking', element: <GeneralBookingPage /> },
        { path: 'file', element: <GeneralFilePage /> },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShopPage /> },
            // { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
            // { path: 'list', element: <EcommerceProductListPage /> },
            // { path: 'product/new', element: <EcommerceProductCreatePage /> },
            { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },

          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
        // {
        //   path: 'blog',
        //   children: [
        //     { element: <Navigate to="/blog/posts" replace />, index: true },
        //     { path: 'posts', element: <BlogPostsPage /> },
        //     { path: 'post/:title', element: <BlogPostPage /> },
        //     { path: 'new', element: <BlogNewPostPage /> },
        //   ],
        // },
        { path: 'files-manager', element: <FileManagerPage /> },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <MailPage /> },
            { path: 'label/:customLabel/:mailId', element: <MailPage /> },
            { path: ':systemLabel', element: <MailPage /> },
            { path: ':systemLabel/:mailId', element: <MailPage /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <FaqsPage /> },
        { path: 'journal/new', element: <EcommerceProductCreatePage /> },
        { path: 'conference/new', element: <ConferenceCreatePage /> },
        { path: 'conference/', element: <ConferenceList /> },
        { path: '/dashboard/conference/:id', element: <ConferenceDetails /> },
        { path: '/dashboard/journal/:id', element: <EcommerceProductDetailsPage /> },
        { path: 'journal/list', element: <EcommerceProductListPage /> },
        { path: 'master/list', element: <MasterList /> },
        { path: '/dashboard/master/:id', element: <MasterDetails /> },
        { path: '/dashboard/evaluation/:id', element: <EvaluationDetails /> },
        { path: 'evaluation/list', element: <EvaluationList /> },
        { path: '/blog/posts', element: <BlogPostsPage /> },
        { path: 'abstractjournal/new', element: <AbstractJournalCreate /> },
        { path: 'Abstractconference/new', element: <AbstractConferenceCreate /> },
        { path: 'featuredjournal', element: <FeaturedJournals /> },
        { path: 'thesis/new', element: <ThesisCreatePage /> },
        { path: 'thesis-archieve/', element: <ThesisListPage /> },
        { path: 'thesis/:volume', element: <ThesisDetails /> },
        { path: '/search-results', element: <SearchResultsPage /> },
        { path: 'ijin/new', element: <IjinCreatePage /> },
        { path: 'ijin/list', element: <IjinList /> },
        { path: '/abstractjournal/', element: <AbstractjournalList /> },
        { path: '/Abstractconference/', element: <AbstractConferenceList /> },
        { path: '/dashboard/abstract/:id', element: <AbstractJournalDetails /> },
        { path: '/dashboard/abstractconference/:id', element: <AbstractConfrenceDetails /> },

// Evaluation AbstractJournalCreate FeaturedJournals ThesisCreatePage ThesisListPage IjinCreatePage, IjinList
// MasterDetails AbstractJournals SearchResultsPage 
        { path: 'selection', element: <SelectionPage /> },

        // Demo Components
        {
          path: 'components',
          children: [
            { element: <ComponentsOverviewPage />, index: true },
            {
              path: 'foundation',
              children: [
                { element: <Navigate to="/components/foundation/colors" replace />, index: true },
                { path: 'colors', element: <FoundationColorsPage /> },
                { path: 'typography', element: <FoundationTypographyPage /> },
                { path: 'shadows', element: <FoundationShadowsPage /> },
                { path: 'grid', element: <FoundationGridPage /> },
                { path: 'icons', element: <FoundationIconsPage /> },
              ],
            },
            {
              path: 'mui',
              children: [
                { element: <Navigate to="/components/mui/accordion" replace />, index: true },
                { path: 'accordion', element: <MUIAccordionPage /> },
                { path: 'alert', element: <MUIAlertPage /> },
                { path: 'autocomplete', element: <MUIAutocompletePage /> },
                { path: 'avatar', element: <MUIAvatarPage /> },
                { path: 'badge', element: <MUIBadgePage /> },
                { path: 'breadcrumbs', element: <MUIBreadcrumbsPage /> },
                { path: 'buttons', element: <MUIButtonsPage /> },
                { path: 'checkbox', element: <MUICheckboxPage /> },
                { path: 'chip', element: <MUIChipPage /> },
                { path: 'data-grid', element: <MUIDataGridPage /> },
                { path: 'dialog', element: <MUIDialogPage /> },
                { path: 'list', element: <MUIListPage /> },
                { path: 'menu', element: <MUIMenuPage /> },
                { path: 'pagination', element: <MUIPaginationPage /> },
                { path: 'pickers', element: <MUIPickersPage /> },
                { path: 'popover', element: <MUIPopoverPage /> },
                { path: 'progress', element: <MUIProgressPage /> },
                { path: 'radio-button', element: <MUIRadioButtonsPage /> },
                { path: 'rating', element: <MUIRatingPage /> },
                { path: 'slider', element: <MUISliderPage /> },
                { path: 'stepper', element: <MUIStepperPage /> },
                { path: 'switch', element: <MUISwitchPage /> },
                { path: 'table', element: <MUITablePage /> },
                { path: 'tabs', element: <MUITabsPage /> },
                { path: 'textfield', element: <MUITextFieldPage /> },
                { path: 'timeline', element: <MUITimelinePage /> },
                { path: 'tooltip', element: <MUITooltipPage /> },
                { path: 'transfer-list', element: <MUITransferListPage /> },
                { path: 'tree-view', element: <MUITreesViewPage /> },
              ],
            },
            {
              path: 'extra',
              children: [
                { element: <Navigate to="/components/extra/animate" replace />, index: true },
                { path: 'animate', element: <DemoAnimatePage /> },
                { path: 'carousel', element: <DemoCarouselsPage /> },
                { path: 'chart', element: <DemoChartsPage /> },
                { path: 'copy-to-clipboard', element: <DemoCopyToClipboardPage /> },
                { path: 'editor', element: <DemoEditorPage /> },
                { path: 'form-validation', element: <DemoFormValidationPage /> },
                { path: 'image', element: <DemoImagePage /> },
                { path: 'label', element: <DemoLabelPage /> },
                { path: 'lightbox', element: <DemoLightboxPage /> },
                { path: 'map', element: <DemoMapPage /> },
                { path: 'mega-menu', element: <DemoMegaMenuPage /> },
                { path: 'multi-language', element: <DemoMultiLanguagePage /> },
                { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
                { path: 'organization-chart', element: <DemoOrganizationalChartPage /> },
                { path: 'scroll', element: <DemoScrollbarPage /> },
                { path: 'snackbar', element: <DemoSnackbarPage /> },
                { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
                { path: 'upload', element: <DemoUploadPage /> },
                { path: 'markdown', element: <DemoMarkdownPage /> },
              ],
            },
          ],
        },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: 'pricing', element: <PricingPage /> },
        { path: 'payment', element: <PaymentPage /> },

      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

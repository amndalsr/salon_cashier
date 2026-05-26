import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  CreditCard,
  Package,
  BarChart3,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Star,
  Phone,
  Mail,
  Trash2,
  Edit3,
  Filter,
  X,
  ChevronLeft,
  MoreHorizontal,
} from "lucide-react";

type View =
  | "dashboard"
  | "agenda"
  | "clientes"
  | "servicos"
  | "pagamentos"
  | "estoque"
  | "relatorios";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

const mockAppointments = [
  { id: 1, client: "Isabela Martins", service: "Coloração + Hidratação", professional: "Amanda", time: "09:00", duration: 150, status: "confirmado", color: "#D4A5A5" },
  { id: 2, client: "Fernanda Costa", service: "Corte + Escova", professional: "Gaby", time: "10:30", duration: 90, status: "aguardando", color: "#C4B08A" },
  { id: 3, client: "Patricia Souza", service: "Manicure + Pedicure", professional: "Laís", time: "11:00", duration: 120, status: "confirmado", color: "#7B9E87" },
  { id: 4, client: "Renata Alves", service: "Escova Progressiva", professional: "Amanda", time: "13:00", duration: 180, status: "em andamento", color: "#B8864E" },
  { id: 5, client: "Larissa Nunes", service: "Sobrancelha Design", professional: "Laís", time: "15:00", duration: 45, status: "confirmado", color: "#9B7EA0" },
  { id: 6, client: "Carolina Lima", service: "Corte Feminino", professional: "Gaby", time: "16:00", duration: 60, status: "aguardando", color: "#D4A5A5" },
];

const mockClients = [
  { id: 1, name: "Isabela Martins", phone: "(11) 99234-5678", email: "isabela@email.com", visits: 12, lastVisit: "20/05/2026", spent: 1840, rating: 5 },
  { id: 2, name: "Fernanda Costa", phone: "(11) 98765-4321", email: "fernanda@email.com", visits: 8, lastVisit: "15/05/2026", spent: 960, rating: 4 },
  { id: 3, name: "Patricia Souza", phone: "(11) 97654-3210", email: "patricia@email.com", visits: 24, lastVisit: "22/05/2026", spent: 3200, rating: 5 },
  { id: 4, name: "Renata Alves", phone: "(11) 96543-2109", email: "renata@email.com", visits: 5, lastVisit: "10/05/2026", spent: 620, rating: 4 },
  { id: 5, name: "Larissa Nunes", phone: "(11) 95432-1098", email: "larissa@email.com", visits: 18, lastVisit: "24/05/2026", spent: 2100, rating: 5 },
  { id: 6, name: "Carolina Lima", phone: "(11) 94321-0987", email: "carolina@email.com", visits: 3, lastVisit: "05/05/2026", spent: 380, rating: 4 },
  { id: 7, name: "Beatriz Santos", phone: "(11) 93210-9876", email: "beatriz@email.com", visits: 31, lastVisit: "25/05/2026", spent: 4750, rating: 5 },
];

const mockServices = [
  { id: 1, name: "Corte Feminino", category: "Cabelo", duration: 60, price: 80, professional: ["Amanda", "Gaby"], active: true },
  { id: 2, name: "Coloração", category: "Cabelo", duration: 120, price: 180, professional: ["Amanda"], active: true },
  { id: 3, name: "Hidratação Profunda", category: "Cabelo", duration: 60, price: 90, professional: ["Amanda", "Gaby"], active: true },
  { id: 4, name: "Escova Progressiva", category: "Cabelo", duration: 180, price: 280, professional: ["Amanda"], active: true },
  { id: 5, name: "Escova Simples", category: "Cabelo", duration: 60, price: 65, professional: ["Gaby"], active: true },
  { id: 6, name: "Manicure", category: "Unhas", duration: 60, price: 45, professional: ["Laís"], active: true },
  { id: 7, name: "Pedicure", category: "Unhas", duration: 60, price: 55, professional: ["Laís"], active: true },
  { id: 8, name: "Sobrancelha Design", category: "Estética", duration: 45, price: 40, professional: ["Laís"], active: true },
  { id: 9, name: "Limpeza de Pele", category: "Estética", duration: 90, price: 120, professional: ["Laís"], active: false },
  { id: 10, name: "Depilação (pernas)", category: "Estética", duration: 60, price: 75, professional: ["Laís"], active: true },
];

const mockPayments = [
  { id: 1, client: "Isabela Martins", service: "Coloração + Hidratação", date: "26/05/2026", amount: 270, method: "Cartão Crédito", status: "pago" },
  { id: 2, client: "Patricia Souza", service: "Manicure + Pedicure", date: "26/05/2026", amount: 100, method: "PIX", status: "pago" },
  { id: 3, client: "Renata Alves", service: "Escova Progressiva", date: "26/05/2026", amount: 280, method: "—", status: "pendente" },
  { id: 4, client: "Fernanda Costa", service: "Corte + Escova", date: "25/05/2026", amount: 145, method: "Cartão Débito", status: "pago" },
  { id: 5, client: "Larissa Nunes", service: "Sobrancelha Design", date: "24/05/2026", amount: 40, method: "PIX", status: "pago" },
  { id: 6, client: "Carolina Lima", service: "Corte Feminino", date: "26/05/2026", amount: 80, method: "—", status: "pendente" },
  { id: 7, client: "Beatriz Santos", service: "Coloração + Hidratação + Corte", date: "25/05/2026", amount: 350, method: "Cartão Crédito", status: "pago" },
  { id: 8, client: "Ana Paula Ramos", service: "Limpeza de Pele", date: "23/05/2026", amount: 120, method: "—", status: "pendente" },
];

const mockStock = [
  { id: 1, name: "Shampoo Hidratante 1L", brand: "L'Oréal", category: "Cabelo", quantity: 8, minStock: 3, price: 45.90, unit: "un" },
  { id: 2, name: "Máscara de Tratamento 500g", brand: "Wella", category: "Cabelo", quantity: 2, minStock: 4, price: 89.00, unit: "un" },
  { id: 3, name: "Progressiva Premium 1L", brand: "BTX", category: "Cabelo", quantity: 5, minStock: 2, price: 120.00, unit: "un" },
  { id: 4, name: "Oxidante 30vol 900ml", brand: "Igora", category: "Coloração", quantity: 12, minStock: 5, price: 18.50, unit: "un" },
  { id: 5, name: "Coloração Louro Mel", brand: "Igora", category: "Coloração", quantity: 1, minStock: 6, price: 32.00, unit: "un" },
  { id: 6, name: "Esmalte Base", brand: "OPI", category: "Unhas", quantity: 15, minStock: 5, price: 24.00, unit: "un" },
  { id: 7, name: "Removedor de Cutícula 100ml", brand: "Barielle", category: "Unhas", quantity: 0, minStock: 3, price: 18.00, unit: "un" },
  { id: 8, name: "Creme Hidratante Pós-Depi", brand: "Depil", category: "Estética", quantity: 7, minStock: 2, price: 38.00, unit: "un" },
  { id: 9, name: "Henna Sobrancelha Castanho", brand: "Biocolor", category: "Estética", quantity: 4, minStock: 3, price: 28.00, unit: "un" },
  { id: 10, name: "Toalha Descartável 50un", brand: "TexBello", category: "Insumos", quantity: 3, minStock: 5, price: 22.00, unit: "pct" },
];

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" | "purple" }) {
  const styles: Record<string, string> = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value, sub, trend, icon: Icon, color }: {
  label: string; value: string; sub: string; trend?: "up" | "down"; icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center`} style={{ backgroundColor: color + "22" }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
        <div className="flex items-center gap-1.5 mt-1">
          {trend === "up" && <TrendingUp size={12} className="text-emerald-600" />}
          {trend === "down" && <TrendingDown size={12} className="text-red-500" />}
          <span className="text-xs text-muted-foreground">{sub}</span>
        </div>
      </div>
    </div>
  );
}

function AppointmentRow({ apt }: { apt: typeof mockAppointments[0] }) {
  const statusMap: Record<string, { label: string; variant: "success" | "warning" | "info" | "default" }> = {
    confirmado: { label: "Confirmado", variant: "success" },
    aguardando: { label: "Aguardando", variant: "warning" },
    "em andamento": { label: "Em andamento", variant: "info" },
  };
  const s = statusMap[apt.status] || { label: apt.status, variant: "default" as const };
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
      <div className="w-1.5 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: apt.color }} />
      <div className="w-16 text-right flex-shrink-0">
        <span className="text-sm font-medium text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{apt.time}</span>
        <p className="text-xs text-muted-foreground">{apt.duration}min</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{apt.client}</p>
        <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
      </div>
      <div className="hidden sm:block text-xs text-muted-foreground flex-shrink-0">{apt.professional}</div>
      <Badge variant={s.variant}>{s.label}</Badge>
    </div>
  );
}

function Dashboard() {
  const totalRevenue = mockPayments.filter(p => p.status === "pago").reduce((a, b) => a + b.amount, 0);
  const pending = mockPayments.filter(p => p.status === "pendente").reduce((a, b) => a + b.amount, 0);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
          Bom dia, Dorinha Silva ✦
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">Segunda-feira, 26 de maio de 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Agendamentos hoje" value="6" sub="+2 vs ontem" trend="up" icon={CalendarDays} color="#B8864E" />
        <StatCard label="Faturamento hoje" value={`R$ ${totalRevenue.toLocaleString("pt-BR")}`} sub="+18% este mês" trend="up" icon={TrendingUp} color="#7B9E87" />
        <StatCard label="A receber" value={`R$ ${pending}`} sub={`${mockPayments.filter(p => p.status === "pendente").length} pagamentos`} icon={CreditCard} color="#D4A5A5" />
        <StatCard label="Clientes ativos" value="7" sub="este mês" icon={Users} color="#9B7EA0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Agenda de Hoje</h2>
            <span className="text-xs text-muted-foreground">{mockAppointments.length} agendamentos</span>
          </div>
          <div>
            {mockAppointments.map(apt => <AppointmentRow key={apt.id} apt={apt} />)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-base font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Profissionais</h2>
            {["Amanda", "Gaby", "Laís"].map((pro, i) => {
              const count = mockAppointments.filter(a => a.professional === pro).length;
              const colors = ["#B8864E", "#D4A5A5", "#7B9E87"];
              return (
                <div key={pro} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" style={{ backgroundColor: colors[i] }}>
                    {pro[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{pro}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(count / 3) * 100}%`, backgroundColor: colors[i] }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-base font-semibold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Estoque crítico</h2>
            {mockStock.filter(p => p.quantity <= p.minStock).slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-xs font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                </div>
                <Badge variant={p.quantity === 0 ? "danger" : "warning"}>
                  {p.quantity === 0 ? "Esgotado" : `${p.quantity} un`}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Agenda() {
  const today = new Date(2026, 4, 26);
  const [currentMonth, setCurrentMonth] = useState(4);
  const [currentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState(26);
  const [showModal, setShowModal] = useState(false);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const selectedApts = mockAppointments;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Agenda</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Novo agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">{MONTHS[currentMonth]} {currentYear}</h2>
            <div className="flex gap-1">
              <button onClick={() => setCurrentMonth(m => Math.max(0, m - 1))} className="p-1 rounded hover:bg-muted transition-colors"><ChevronLeft size={16} /></button>
              <button onClick={() => setCurrentMonth(m => Math.min(11, m + 1))} className="p-1 rounded hover:bg-muted transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && currentMonth === today.getMonth();
              const isSelected = day === selectedDay;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`text-xs rounded-lg py-1.5 transition-all font-medium
                    ${isSelected ? "bg-primary text-primary-foreground" : isToday ? "bg-accent/40 text-foreground" : "hover:bg-muted text-foreground"}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h2 className="text-base font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {selectedDay} de {MONTHS[currentMonth]}
          </h2>
          <div className="space-y-1">
            {["08:00","09:00","10:00","10:30","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"].map(time => {
              const apt = selectedApts.find(a => a.time === time);
              return (
                <div key={time} className="flex items-stretch gap-3 min-h-[52px]">
                  <div className="w-12 text-right pt-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground font-mono">{time}</span>
                  </div>
                  <div className="w-px bg-border flex-shrink-0" />
                  <div className="flex-1 py-1">
                    {apt ? (
                      <div className="rounded-lg px-3 py-2 text-sm flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: apt.color + "22", borderLeft: `3px solid ${apt.color}` }}>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-xs">{apt.client}</p>
                          <p className="text-muted-foreground text-xs">{apt.service} · {apt.professional}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{apt.duration}min</span>
                      </div>
                    ) : (
                      <div className="h-full rounded-lg border border-dashed border-border hover:border-primary/40 transition-colors cursor-pointer" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Novo Agendamento</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-muted transition-colors"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {[["Cliente","Selecionar cliente..."],["Serviço","Selecionar serviço..."],["Profissional","Selecionar profissional..."]].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">{label}</label>
                  <select className="w-full bg-input-background rounded-lg px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>{placeholder}</option>
                  </select>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Data</label>
                  <input type="date" defaultValue="2026-05-26" className="w-full bg-input-background rounded-lg px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Horário</label>
                  <input type="time" defaultValue="09:00" className="w-full bg-input-background rounded-lg px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Observações</label>
                <textarea rows={2} placeholder="Alguma observação..." className="w-full bg-input-background rounded-lg px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Clientes() {
  const [search, setSearch] = useState("");
  const filtered = mockClients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Clientes</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Nova cliente
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar cliente por nome..."
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border">
          <span className="col-span-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:block">Visitas</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:block">Última visita</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:block">Total gasto</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Avaliação</span>
        </div>
        {filtered.map(client => (
          <div key={client.id} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer items-center">
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/40 flex items-center justify-center text-sm font-semibold text-foreground flex-shrink-0">
                {client.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{client.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Phone size={10} />
                  <span>{client.phone}</span>
                </div>
              </div>
            </div>
            <div className="col-span-2 hidden md:block">
              <span className="text-sm text-foreground font-mono">{client.visits}x</span>
            </div>
            <div className="col-span-2 hidden lg:block">
              <span className="text-sm text-muted-foreground">{client.lastVisit}</span>
            </div>
            <div className="col-span-2 hidden lg:block">
              <span className="text-sm font-medium text-foreground">R$ {client.spent.toLocaleString("pt-BR")}</span>
            </div>
            <div className="col-span-2 flex items-center gap-1">
              {Array.from({ length: client.rating }).map((_, i) => (
                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Servicos() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const categories = ["Todos", "Cabelo", "Unhas", "Estética"];
  const filtered = activeCategory === "Todos" ? mockServices : mockServices.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Serviços & Valores</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Novo serviço
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(service => (
          <div key={service.id} className={`bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all ${!service.active ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{service.name}</p>
                <Badge variant={service.category === "Cabelo" ? "warning" : service.category === "Unhas" ? "purple" : "info"}>
                  {service.category}
                </Badge>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Edit3 size={14} className="text-muted-foreground" /></button>
                <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Trash2 size={14} className="text-muted-foreground" /></button>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={13} />
                <span className="text-xs">{service.duration} min</span>
              </div>
              <p className="text-xl font-semibold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                R$ {service.price.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center gap-1 flex-wrap">
              {service.professional.map(p => (
                <span key={p} className="text-xs bg-muted rounded-full px-2.5 py-1 text-muted-foreground">{p}</span>
              ))}
              {!service.active && <Badge variant="danger">Inativo</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pagamentos() {
  const [tab, setTab] = useState<"todos" | "pendente" | "pago">("todos");
  const filtered = tab === "todos" ? mockPayments : mockPayments.filter(p => p.status === tab);
  const totalPago = mockPayments.filter(p => p.status === "pago").reduce((a, b) => a + b.amount, 0);
  const totalPendente = mockPayments.filter(p => p.status === "pendente").reduce((a, b) => a + b.amount, 0);

  const methodIcon = (m: string) => {
    if (m === "PIX") return "🟩";
    if (m.includes("Crédito")) return "💳";
    if (m.includes("Débito")) return "💳";
    return "—";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Pagamentos</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Registrar pagamento
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total recebido</p>
          <p className="text-xl font-semibold text-emerald-600" style={{ fontFamily: "'Playfair Display', serif" }}>R$ {totalPago.toLocaleString("pt-BR")}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">A receber</p>
          <p className="text-xl font-semibold text-amber-600" style={{ fontFamily: "'Playfair Display', serif" }}>R$ {totalPendente}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total geral</p>
          <p className="text-xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>R$ {(totalPago + totalPendente).toLocaleString("pt-BR")}</p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-border">
        {(["todos", "pendente", "pago"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all capitalize -mb-px
              ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t === "todos" ? "Todos" : t === "pendente" ? "Pendentes" : "Pagos"}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border">
          <span className="col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</span>
          <span className="col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:block">Serviço</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Valor</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</span>
        </div>
        {filtered.map(payment => (
          <div key={payment.id} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors items-center">
            <div className="col-span-3">
              <p className="text-sm font-medium text-foreground">{payment.client}</p>
              <p className="text-xs text-muted-foreground">{payment.method !== "—" ? methodIcon(payment.method) + " " + payment.method : "—"}</p>
            </div>
            <div className="col-span-3 hidden md:block">
              <p className="text-sm text-foreground truncate">{payment.service}</p>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-muted-foreground font-mono">{payment.date}</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-foreground">R$ {payment.amount}</span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              {payment.status === "pago" ? (
                <Badge variant="success"><CheckCircle2 size={10} /> Pago</Badge>
              ) : (
                <Badge variant="warning"><AlertCircle size={10} /> Pendente</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Estoque() {
  const [search, setSearch] = useState("");
  const filtered = mockStock.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
  const criticalCount = mockStock.filter(p => p.quantity <= p.minStock).length;

  const stockStatus = (item: typeof mockStock[0]) => {
    if (item.quantity === 0) return { label: "Esgotado", variant: "danger" as const };
    if (item.quantity <= item.minStock) return { label: "Crítico", variant: "warning" as const };
    return { label: "OK", variant: "success" as const };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Estoque</h1>
          {criticalCount > 0 && (
            <p className="text-xs text-amber-600 mt-0.5 flex items-center gap-1">
              <AlertCircle size={12} /> {criticalCount} produto{criticalCount > 1 ? "s" : ""} com estoque crítico
            </p>
          )}
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Adicionar produto
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar produto ou marca..."
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border">
          <span className="col-span-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Produto</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:block">Categoria</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantidade</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:block">Preço un.</span>
          <span className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</span>
        </div>
        {filtered.map(item => {
          const status = stockStatus(item);
          return (
            <div key={item.id} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors items-center">
              <div className="col-span-4">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.brand}</p>
              </div>
              <div className="col-span-2 hidden md:block">
                <span className="text-xs bg-muted rounded-full px-2.5 py-1 text-muted-foreground">{item.category}</span>
              </div>
              <div className="col-span-2">
                <div className="flex items-baseline gap-1">
                  <span className={`text-sm font-semibold font-mono ${item.quantity === 0 ? "text-red-600" : item.quantity <= item.minStock ? "text-amber-600" : "text-foreground"}`}>
                    {item.quantity}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">mín: {item.minStock}</p>
              </div>
              <div className="col-span-2 hidden lg:block">
                <span className="text-sm text-foreground font-mono">R$ {item.price.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="col-span-2">
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Relatorios() {
  const weekData = [
    { day: "Seg", receita: 480, atendimentos: 5 },
    { day: "Ter", receita: 320, atendimentos: 3 },
    { day: "Qua", receita: 650, atendimentos: 7 },
    { day: "Qui", receita: 290, atendimentos: 3 },
    { day: "Sex", receita: 820, atendimentos: 9 },
    { day: "Sáb", receita: 940, atendimentos: 10 },
    { day: "Dom", receita: 0, atendimentos: 0 },
  ];
  const maxReceita = Math.max(...weekData.map(d => d.receita));

  const topServices = [
    { name: "Escova Progressiva", count: 14, revenue: 3920 },
    { name: "Coloração", count: 22, revenue: 3960 },
    { name: "Corte Feminino", count: 31, revenue: 2480 },
    { name: "Manicure + Pedicure", count: 28, revenue: 2800 },
    { name: "Hidratação", count: 18, revenue: 1620 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Relatórios</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Receita do mês", value: "R$ 18.340", sub: "Mai/2026" },
          { label: "Atendimentos", value: "124", sub: "este mês" },
          { label: "Ticket médio", value: "R$ 147,90", sub: "por atendimento" },
          { label: "Novos clientes", value: "12", sub: "este mês" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{kpi.label}</p>
            <p className="text-xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-base font-semibold text-foreground mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Receita semanal</h2>
          <div className="flex items-end gap-2 h-40">
            {weekData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground font-mono">
                  {d.receita > 0 ? `${d.receita}` : ""}
                </span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: d.receita > 0 ? `${(d.receita / maxReceita) * 120}px` : "4px",
                    backgroundColor: d.receita > 0 ? "#B8864E" : "#F0EBE6",
                  }}
                />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-base font-semibold text-foreground mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Serviços mais realizados</h2>
          <div className="space-y-3">
            {topServices.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-4">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-foreground">{s.name}</p>
                    <span className="text-xs text-muted-foreground">{s.count}x</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(s.count / 31) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-medium text-foreground w-20 text-right">R$ {s.revenue.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "agenda", label: "Agenda", icon: CalendarDays },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "servicos", label: "Serviços", icon: Scissors },
  { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
  { id: "estoque", label: "Estoque", icon: Package },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
];

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (view) {
      case "dashboard": return <Dashboard />;
      case "agenda": return <Agenda />;
      case "clientes": return <Clientes />;
      case "servicos": return <Servicos />;
      case "pagamentos": return <Pagamentos />;
      case "estoque": return <Estoque />;
      case "relatorios": return <Relatorios />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-60 bg-sidebar flex flex-col h-full transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="px-6 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Scissors size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Dorinha Silva</p>
              <p className="text-xs text-sidebar-foreground/50">Salão de Beleza</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                  ${active ? "bg-sidebar-primary text-white" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold">DS</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Dorinha Silva</p>
              <p className="text-xs text-sidebar-foreground/40">Gerente</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden" onClick={() => setSidebarOpen(true)}>
            <MoreHorizontal size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
            <span>Dorinha Silva</span>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium capitalize">{navItems.find(n => n.id === view)?.label}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

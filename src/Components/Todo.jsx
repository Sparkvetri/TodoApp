import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState('All')
    const [count, setCount] = useState(0)
    
    const addTodos = ()=>{
        if (input.trim()==='') return

        const newTodo = {
            id:Date.now(),
            text:input,
            completed:false
        }
        setTodos([...todos,newTodo])
        setCount(count+1)
        localStorage.setItem('todos',JSON.stringify([...todos,newTodo]))
        setInput('')
        
        
    }
    const addTocompleted = (id)=>{
        const updateTodo = todos.map(todo=>todo.id==id ? {...todo,completed:true}:todo)
        setTodos(updateTodo)
        localStorage.setItem('todos',JSON.stringify(updateTodo))
        setCount(count-1)

    }
    useEffect(()=>{
        const savedTodos = localStorage.getItem('todos')
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos))
        }
    },[])

    const filteredTodos = filter === 'All' ? todos : filter === 'Active' ? todos.filter(todo => !todo.completed) : todos.filter(todo => todo.completed)
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-4 md:p-10 flex justify-center">
      {/* Main Container */}
      <div className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar: Filters & Categories */}
        <div className="w-full md:w-64 bg-slate-900/50 p-6 border-b md:border-b-0 md:border-r border-slate-700">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">My Tasks</h1>
            <p className="text-slate-500 text-sm mt-1">Apr 15, 2026</p>
          </div>

          <div className="space-y-6">
            <nav className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Status</p>
              {['All', 'Active', 'Completed'].map((tab) => (
          <button 
            key={tab} 
           onClick={() => setFilter(tab)} // Update state on click
          className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${
          filter === tab 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' // Active style
          : 'hover:bg-slate-800 text-slate-400' // Inactive style
           }`}
  >
    {tab}
  </button>
))}
            </nav>

           { /*<nav className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Categories</p>
              {['Work', 'Personal', 'Health'].map((cat) => (
                <button key={cat} className="w-full text-left px-4 py-2 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-all flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                  {cat}
                </button>
              ))}
            </nav>*/}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-8">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center">
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className="text-xs text-slate-500 uppercase">Total</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center">
              <p className="text-2xl font-bold text-emerald-400">{todos.filter((task) => task.completed).length}</p>
              <p className="text-xs text-slate-500 uppercase">Done</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center">
              <p className="text-2xl font-bold text-orange-400">{todos.filter((task) => !task.completed).length}</p>
              <p className="text-xs text-slate-500 uppercase">Left</p>
            </div>
          </div>

          {/* Add Task Input */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder='Add a new task...' 
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-200"
              onChange={(e)=>setInput(e.target.value)}
              value={input}
            />
            <button className="absolute right-3 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-95"
            onClick={addTodos}>
              Add
            </button>
          </div>

          {/* Lists Container */}
          <div className="space-y-8 overflow-y-auto max-h-100 pr-2 custom-scrollbar">
            {/* Active Todos */}
            <div>
              <h2 className="text-sm font-semibold text-indigo-400 mb-4 flex items-center gap-2">
                <span className="h-1 w-8 bg-indigo-500 rounded-full"></span>
                In Progress
              </h2>
              <div className="space-y-3">
                {filteredTodos.filter((task) => !task.completed).map((task, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all group">
                    <div className="h-6 w-6 rounded-full border-2 border-slate-600 group-hover:border-indigo-500 cursor-pointer transition-colors" onClick={()=>addTocompleted(task.id)}></div>
                    <span className="text-slate-300 font-medium">{task.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Todos */}
            <div>
              <h2 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span className="h-1 w-8 bg-emerald-500 rounded-full"></span>
                Completed
              </h2>
              <div className="space-y-3 opacity-60">
                {filteredTodos.filter((task) => task.completed).map((task, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800 line-through text-slate-500">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span>{task.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
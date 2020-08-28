export default function ErrorDisplay({ error }) {
  return (
    <>
      {error && (
        <div className='flex justify-center'>
          <span className='text-xl font-semibold p-1 m-2 px-4'>{error}</span>
        </div>
      )}
    </>
  );
}
